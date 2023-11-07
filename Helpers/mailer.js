let mailer = require('nodemailer')
//let otpGenerator= require("otp-generator")
function mail(mailoption){
    return new Promise((res,rej)=>{
        let transporter = mailer.createTransport({
            host : "smtp.gmail.com",
            port : 465,
            secure : true, //Transport Layer Security(TLS)
            auth : {
                user : "deathneptune@gmail.com",
                pass : "cputgyfwqggxykfa"
            }
        })
        
        transporter.sendMail(mailoption,(err)=>{
            if(err){
                return rej(err)
            }
            return res(`mail is send to ${mailoption.to}`)
        })
    })
}
//let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets:false});

module.exports = {mail}