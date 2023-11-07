let productmodel = require('../Model/productmodel')

async function addUI(req,res){
    return res.render('product/add',{})
}

async function createproduct(req,res){
    let modelproduct = await productmodel.productcreate(req.body).catch((err)=>{
        return {error:err}
    })
    if(!modelproduct || (modelproduct && modelproduct.error)){
        let error = (modelproduct && modelproduct.error) ? modelproduct.error : "Internal server error"
        return res.send({error})
    }
    return res.redirect('/product')
    //return res.send({data:modelproduct.data})
}

async function viewAll(req,res){
    let product = await productmodel.viewall(req.query,req.userData.Permissions).catch((err)=>{
        return {error:err}
    })
    if(!product || (product && product.error)){
        return res.render('product/view',{error:product.error})
    }
    return res.render('product/view',{product : product.data, total : product.total, page : product.page, limit : product.limit, Permissions : req.userData.Permissions})
}

async function viewDetail(req,res){
    let product = await productmodel.viewdetail(req.params.id).catch((err)=>{
        return {error:err}
    })
    console.log("product",product);
    if(!product || (product && product.error)){
        return res.render("product/view",{error:product.error})
    }
    return res.render("product/details",{product: product.data})
}

async function updateUI(req,res){
    let product = await productmodel.viewdetail(req.params.id).catch((err)=>{
        return {error:err}
    })
    if(!product || (product && product.error)){
        let url = (product && product.data && product.data.id) ? '/product/'+product.data.id:'/product';
        return res.redirect(url)
    }
    return res.render('product/update',{product:product.data})
}

async function update(req,res){
    let product = await productmodel.update(req.params.id,req.body).catch((err)=>{
        return {error:err}
    })
    if(!product || (product && product.error)){
        let url = (product && product.data && product.data.id) ? '/product/'+product.data.id:'/product';
        return res.redirect(url)
    }
    let url = (product && product.data && product.data.id) ? '/product/'+product.data.id:'/product';
    return res.redirect(url)
}

async function productDelete(req,res){
    let product = await productmodel.pDelete(req.params.id).catch((err)=>{
        return {error:err}
    })
    //console.log('product',product);
    if(!product || (product && product.error)){
        let url = (req.params && req.params.id) ? '/product/'+req.params.id:'/product';
        return res.redirect(url)
    }
    return res.redirect('/product')
}

async function productRestore(req,res){
    let product = await productmodel.pRestore(req.params.id).catch((err)=>{
        return {error:err}
    })
    //console.log('product',product);
    if(!product || (product && product.error)){
        let url = (req.params && req.params.id) ? '/product/'+req.params.id:'/product';
        return res.redirect(url)
    }
    return res.redirect('/product')
}

module.exports = {createproduct,viewAll,viewDetail,addUI,updateUI,update,productDelete,productRestore}