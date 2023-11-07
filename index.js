let express = require('express')
let session = require('express-session')
let config = require('config')
let port = config.get('port')

let app = express()
let {routes} = require('./routes')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:'#*12@z*'
}))

app.set("view engine","ejs")

app.use(express.static(__dirname + '/public'))

app.use(routes)
app.listen(port,()=>{
    console.log("Connected",port);
})  