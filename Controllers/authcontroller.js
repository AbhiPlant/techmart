let registercontrol = require('../Model/authmodel')
let logincontrol = require('../Model/authmodel')
let forgetControl = require('../Model/authmodel')

async function registerUser(req,res){
    let registerdata = await registercontrol.register(req.body).catch((err)=>{
        return {error:err}
    })
    //console.log('registerdata',registerdata)
    if(!registerdata || (registerdata && registerdata.error)){
        let error = (registerdata && registerdata.error) ? registerdata : 'internal server error'
        return res.send({error})
    }
    //return res.send({data:registerdata.data})
    return res.redirect('/?msg=success')
}

async function loginUser(req,res){
    let logindata = await logincontrol.userlogin(req.body).catch((errorr)=>{
        return {error:errorr}
    })
    
    if(!logindata || (logindata && logindata.error)){
        let error = (logindata && logindata.error) ? logindata : "internal server error"
        return res.send({error})
    }
    req.session.token = logindata.token
    return res.redirect('/dashboard')
    //return res.redirect({data:logindata.data,token:logindata.token})
}
async function forgetpaasUi(req,res){
    return res.render("forgetPassword",{})
}
async function forgetpaas(req,res){
    let forgetdata = await forgetControl.forgetpassword(req.body).catch((err)=>{
        return {error:err}
    })
    if(!forgetdata || (forgetdata && forgetdata.error)){
        let error = (forgetdata && forgetdata.error) ? forgetdata : "Internal server error"
        return res.send({error})
    }
    return res.send({data:forgetdata})
}

function registerui(req,res){
    return res.render('reglog.ejs',{})
}

module.exports = {registerUser,loginUser,registerui,forgetpaas,forgetpaasUi}