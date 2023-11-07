const { where } = require('sequelize')
let {product} = require('../Schema/ProductSchema')
let joi = require('joi')

async function productcreate(params){
    let valid = await check(params).catch((err)=>{
        return {error:err}
    })

    if(!valid || (valid && valid.error)){
        return {error:valid.error}
    }

    let userproduct = {
        name:params.username,
        price:params.rupees,
        description:params.describe
    }

    let data = await product.create(userproduct).catch((err)=>{
        return {error:err}
    })

    if(!data || (data && data.error)){
        return {error:"internal server error"}
    }
    return {data:data}
}

async function check(made){
    let schema = joi.object({
        username:joi.string().required(),
        rupees:joi.string().required(),
        describe:joi.string().required()
    })

    let valid = await schema.validateAsync(made).catch((err)=>{
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

async function viewall(params,Permissions){
    let limit = (params.limit) ? parseInt(params.limit) : 10;
    let page = (params.page) ? parseInt(params.page ): 1;
    let offset = (page-1)*limit

    let where = {};
    if(!Permissions.product_restore){
        where = {is_deleted:false}
    }

    let counter = await product.count({where}).catch((err)=>{
        return {error:err}
    })
    if(!counter || (counter && counter.error)){
        return {error:'internal error'}
    }
    if(counter <= 0){
        return {error:'record not found'}
    }

    let data = await product.findAll({limit,offset,raw:true,where}).catch((err)=>{
        return {error:err}
    })
    if(!data || (data && data.error)){
        return {error:"internal",status:500}
    }
    //console.log(data)
    return {data:data,total:counter,page:page,limit:limit}
}

async function viewdetail(id){
    let data = await product.findOne({where:{id}}).catch((err)=>{
        return {error:err}
    })
    if(!data || (data && data.error)){
        return {error:"INTERNAL SERVER ERROR",status : 500}
    }
    return {data};
}

async function checkUpdate(data){
    let schema = joi.object({
        id:joi.number().required(),
        username:joi.string(),
        rupees:joi.string(),
        describe:joi.string()
    })

    let valid = await schema.validateAsync(data).catch((err)=>{
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

async function update(id,params){
    params.id = id;

    let valid = await checkUpdate(params).catch((err)=>{
        return {error:err}
    })
    if(!valid || (valid && valid.error)){
        return {error:valid.error}
    }

    let data = await product.findOne({where:{id},raw:true}).catch((err)=>{
        return {error:err}
    })
    if(!data || (data && data.error)){
        return {error: "internal server error1"}
    }

    data.name = params.username,
    data.price = params.rupees,
    data.description = params.describe;

    let updateProduct = await product.update(data,{where:{id}}).catch((err)=>{
        return {error:err}
    })
    if(!updateProduct || (updateProduct && updateProduct.error)){
        return {error: "internal server error2"}
    }
    return {data:data}
}

//Delete
async function checkDelete(data){
    let schema = joi.object({
        id:joi.number().required()
    })
    let valid = await schema.validateAsync(data).catch((err)=>{
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

async function pDelete(id,decision){
    //user data validation

    let valid = await checkDelete({id}).catch((err)=>{
        return {error:err}
    })
    if(!valid || (valid && valid.error)){
        return {error:valid.error}
    }

    //check if product exist
    let data = await product.findOne({where:{id},raw:true}).catch((err)=>{
        return {error:err}
    })
    if(!data || (data && data.error)){
        return {error:"Internal server error"}
    }

    //check if product is already deleted
    if(data.is_deleted == true){
        return {error:"Product is already deleted"}
    }

    //update product table
    let updateProduct = await product.update({is_deleted:true},{where:{id}}).catch((err)=>{
        return {error:err}
    })
    if(!updateProduct || (updateProduct && updateProduct.error)){
        return {error:"Internal server error"}
    }
    if(updateProduct <= 0){
        return {error:"record not deleted"}
    }
    //return data
    return {data:"record successfully deleted"}
}

async function pRestore(id){

     let valid = await checkDelete({id}).catch((err)=>{
        return {error:err}
    })
    if(!valid || (valid && valid.error)){
        return {error:valid.error}
    }

    let data = await product.findOne({where:{id},raw:true}).catch((err)=>{
        return {error:err}
    })
    if(!data || (data && data.error)){
        return {error:"Internal server error"}
    }

    if(data.is_deleted == false){
        return {error:"Product is already deleted"}
    }

    //update product table
    let updateProduct = await product.update({is_deleted:false},{where:{id}}).catch((err)=>{
        return {error:err}
    })
    if(!updateProduct || (updateProduct && updateProduct.error)){
        return {error:"Internal server error"}
    }
    if(updateProduct <= 0){
        return {error:"record not deleted"}
    }
    //return data
    return {data:"record successfully restore"}
}

module.exports = {productcreate,viewall,viewdetail,update,pDelete,pRestore}