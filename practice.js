// let {User} = require('./Schema/UserSchema')
// let joi = require('joi')
// let security = require('./Helpers/security')

// async function register(data){
//     let schema = joi.object({
//         name : joi.string().required(),
//         email : joi.string().required(),
//         phone : joi.number().required(),
//         password : joi.string().required()
//     })

//     let valid = await schema.validateAsync(data).catch((err)=>{
//         return {error:err}
//     })
//     if(!valid || (valid && valid.error)){
//         let msg = []
//         for(let i of valid.error.details){
//             msg.push(i.message)
//         }
//         return {error:msg}
//     }
//     return {data : valid}
// }

// async function userRegister(params){
//     let verify = await register(params).catch((err)=>{
//         return {error:err}
//     })
//     if(!verify || (verify && verify.error)){
//         return {error:verify.error}
//     }

//     let find = await User.findOne({where : {email_id:params.email}}).catch((err)=>{
//         return {error:err}
//     })
//     if(find || (find && find.error)){
//         return {error:find.error}
//     }

//     let pass = await security.hash(params.password).catch((err)=>{
//         return {error:err}
//     })
//     if(!pass || (pass && pass.error)){
//         return {error:pass.error}
//     }

//     let userData = {
//         Name : params.name,
//         email_id : params.email,
//         contact : params.phone,
//         password : pass.data
//     }

//     let data = await User.create(userData).catch((err)=>{
//         return {err:error}
//     })
//     if(!data || (data && data.error)){
//         return {error:data.error}
//     }
//     return {data:data}
// }

// //Login 

// async function login(data){
//     let loginschema = joi.object({
//         email : joi.string().require(),
//         password : joi.string().required()
//     })

//     let valid = await loginschema.validateAsync(data).catch((err)=>{
//         return {error:err}
//     })
//     if(!valid || (valid || valid.error)){
//         let msg = []
//         for(let i of valid.error.details){
//             msg.push(i.message)
//         }
//         return {error:msg}
//     }
//     return {data : valid}
// }


// async function userLogin(params){
//     let verify = await login(params).catch((error)=>{
//         return {error}
//     })
//     if(!verify || (verify && verify.error)){
//         return {error:verify.error}
//     }

//     let find = await User.findOne({where : {email_id:params.email}}).catch((error)=>{
//         return {error}
//     })
//     if(!find || (find && find.error)){
//         return {error:find.error}
//     }

//     let confirm = await security.compare(params.password,find.password).catch((error)=>{
//         return {error}
//     })
//     if(!confirm || (confirm && confirm.error)){
//         return {error:confirm.error}
//     }

//     let token  = await security.encrypt({id:find.id},"#!@#23").catch((error)=>{
//         return {error}
//     })
//     if(!token || (token && token.error)){
//         return {error:token.error}
//     }

//     let updatetoken = await User.update({token:token},{id:find.id}).catch((error)=>{
//         return {error}
//     })
//     if(!updatetoken || (updatetoken && updatetoken.error)){
//         return {error:updatetoken.error}
//     }
//     return {data:"login success", token:token}
// }

// let arr = [
//     { id: 1, name: "abc", permission: "View" },
//     { id: 1, name: "abc", permission: "Create" },
//     { id: 1, name: "abc", permission: "Update" },
//     { id: 1, name: "abc", permission: "Delete" },
//   ];
// let obj = {};
// for (let i = 0; i < arr.length; i++) {
//     let newobj = arr[i].permission
//     obj[newobj] = true
//   }
// console.log(obj);

let a = "Hello World"
let ab = {}

for(let i of a){
 // console.log(i);
  if(ab[i] === 'l' || ab[i]==='o'){
    ab[i]++
    console.log(ab[i]);
  } else {
    ab[i] = 1
    //console.log(ab);
  }
}
for(let i of a){
  console.log(i,":",i.length)
}
console.log(ab);

// for(let i of a){
//   console.log(i);
//   if(a[i] === 'l' || a[i] === 'o'){
//     ab = a[i]
//   }
  
// }
// console.log(ab);