let express = require('express')
let routes = express.Router()
let user = require('./Controllers/userController')
let product = require('./Controllers/productcontrol')
let auth = require('./Controllers/authcontroller')
let authMid = require('./Middleware/authMiddleware')
let dashboard = require('./Controllers/dashboardcontroller')

//User auth routes
routes.get('/',auth.registerui)
routes.get('/login',auth.registerui)
routes.post('/register',auth.registerUser)
routes.post('/login',auth.loginUser)

routes.get('/dashboard',authMid.auth('user'),dashboard.index)



//product routes
routes.get('/product/create',authMid.auth('product_create'),product.addUI)
routes.post('/product/create',authMid.auth('product_create'),product.createproduct)
routes.get('/product',authMid.auth('product_view'),product.viewAll)
routes.get('/product/:id',authMid.auth('product_view'),product.viewDetail)
routes.get('/product/update/:id',authMid.auth('product_update'),product.updateUI)
routes.post('/product/:id',authMid.auth('product_update'),product.update)
routes.post('/product/delete/:id',authMid.auth('product_delete'),product.productDelete)
routes.post('/product/restore/:id',authMid.auth('product_restore'),product.productRestore)


//mailer
routes.get('/forget',auth.forgetpaasUi)
routes.post('/forgetPasswod',auth.forgetpaas)

module.exports = {routes}