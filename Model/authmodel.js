let joi = require("joi");
let { User } = require("../Schema/UserSchema");
let {Userpermission} = require('../Schema/userpermission')
let security = require("../Helpers/security");
let otpGenerator = require('otp-generator')
let {mail }= require('../Helpers/mailer')   

async function check(data){
    let Schema = joi.object({
        userName: joi.string().min(2).max(15).required(),
        email: joi.string().email().min(8).max(30).required(),
        phone: joi.string().required(),
        password: joi.string().min(8).max(15).required(),
      });
      let valid = await Schema.validateAsync(data).catch((err) => {
        return { error: err };
      });
      if (!valid || (valid && valid.error)) {
        let msg = [];
        for (let i of valid.error.details) {
          msg.push(i.message);
        }
        return { error: msg };
      }
      return { data: valid };
}

async function register(params) {
  let valid = await check(params).catch((err) => {
    return { error: err };
  });
  if (!valid || (valid && valid.error)) {
    return { error: valid.error };
  }

  let finduser = await User.findOne({where : {email_id:params.email}}).catch((err)=>{
    return {error : err}
  })
  if(finduser || (finduser && finduser.error)){
    return {error:finduser.error}
  }

  let pass = await security.hash(params.password).catch((err)=>{
    return {error:err}
  })
  if(!pass || (pass && pass.error)){
    return {error:pass.error}
  }

  let userData = {
    name: params.userName,
    email_id: params.email,
    contact: params.phone,
    password: pass.data
  };
  let data = await User.create(userData).catch((err) => {
    return { error: err };
  });
 //console.log(data)
  if (!data || (data && data.error)) {
    return { error: "Internal server error" };
  }
  let userpermission = {
    user_id : data.id,
    permission_id : 1
  }
  let updata = await Userpermission.create(userpermission).catch((err)=>{
    return {error:err}
  })
  if(!updata || (updata && updata.error)){
    return {error:updata.error}
  }
  return { data };
}

//Login

async function login(data){
  let loginschema = joi.object({
    email: joi.string().email().min(8).max(30).required(),
    password: joi.string().min(8).max(15).required() 
  })

  let valid = await loginschema.validateAsync(data).catch((err)=>{
    return {error:err}
  })

  if(!valid || (valid && valid.error)){
    let msg = []
    for(let i of valid.error.details){
      msg.push(i.message)
    }
    return {error:msg}
  }
  return {data:valid}
}

async function userlogin(params){
  let valid = await login(params).catch((err)=>{
    return {error:err}
  })
  if(!valid || (valid && valid.error)){
    return {error:valid.error}
  }

  let find = await User.findOne({where :{email_id:params.email}}).catch((error)=>{
    return {error}
  })
  if(!find || (find && find.error)){
    return {error:"user is not found"}
  }


  let confirm = await security.compare(params.password,find.password).catch((error)=>{
    return {error}
  })
  if(!confirm || (confirm && confirm.error)){
    return {error:"User Password is not found"}
  }

  let token = await security.encrypt({id:find.id},"#122fvz").catch((err)=>{
    return {error:err}
  })
  if(!token || (token && token.error)){
    return {error:token.error}
  }

  let updatetoken = await User.update({token:token},{where:{id:find.id}}).catch((err)=>{
    return {error:err}
  })
  //console.log("db",updatetoken)
  if(!updatetoken || (updatetoken && updatetoken.error) || (updatetoken && updatetoken[0] <= 0)){
    return {error:"Internal server error"}
  }

  return {data : "login successfull",token:token}
  
}

//Forget Password

async function forgetPassword(data){
  let forgetschema = joi.object({
    email: joi.string().email().min(8).max(30).required()
  })

  let valid = await forgetschema.validateAsync(data).catch((err)=>{
    return {error:err}
  })
  if(!valid || (valid && valid.error)){
    let msg = []
    for(let i of valid.error.details){
      msg.push(i.message)
    }
    return {error:message}
  }
  return {data:valid}

}

async function forgetpassword(params){
  let valid = await forgetPassword(params).catch((err)=>{
    return {error:err}
  }) 
  if(!valid || (valid && valid.error)){
    return {error:valid.error}
  }

  let find = await User.findOne({where :{email_id:params.email}}).catch((error)=>{
    return {error}
  })
  if(!find || (find && find.error)){
    return {error:"user is not found"}
  }
  
  let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});
  
  
  let hashOtp = await security.hash(otp).catch((err)=>{
    return {error:err}
  })
  if(!hashOtp || (hashOtp && hashOtp.error)){
    return {error:hashOtp.error}
  }
  
  let save = await User.update({otp:hashOtp.data},{where:{id:find.id}}).catch((err)=>{
    return {error:err}
  })
  //console.log("save",save);
  if(!save || (save && save.error)){
    return {error:save.error}
  }

  
  let mailOption = {
    from : 'deathneptune@gmail.com',
    to : params.email,
    subject : 'mail testing',
    text : `This is your otp :- ${otp}` 
  }

  
  let sendmail = await mail(mailOption).catch((err)=>{
    return {error:err}
  })

  
  if(!sendmail || (sendmail && sendmail.error)){
    console.log(sendmail)
    return {data:'mail is not send'}
  }
  
return {data: `mail is send to ${params.email}`}
}




module.exports = {register,userlogin,forgetpassword}