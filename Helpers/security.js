let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')


function encrypt(text,key){
    return new Promise((res,rej)=>{
        jwt.sign(text,key,(err,data)=>{
            if(err){
                return rej(err)
            }
            return res(data)
        })
    })
}

function decrypt(text,key){
    return new Promise((res,rej)=>{
        jwt.verify(text,key,(err,data)=>{
            if(err){
                return rej(err)
            }
            return res(data)
        })
    })
}

async function hash(text,salt=10){
    let encrypt = await bcrypt.hash(text,salt).catch((err)=>{
        return {error:err}
    })
    if(!encrypt || (encrypt && encrypt.error)){
        return {error:encrypt.error}
    }
    return {data : encrypt}
}

async function compare(text,encrypttext){
    let check = await bcrypt.compare(text,encrypttext).catch((error)=>{
        return {error}
    })
    if(!check || (check && check.error)){
        return {error:check && check.error ? check.error : true}
    }
    return {data:true}
}

module.exports = {encrypt, decrypt, hash, compare}   