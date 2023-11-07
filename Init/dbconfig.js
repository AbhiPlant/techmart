let {Sequelize,Model,DataTypes,Op,QueryTypes} = require('sequelize')
let sequelizecon = new Sequelize('mysql://root:@localhost/ecom')
sequelizecon.authenticate().then().catch()
module.exports = {
    sequelizecon,
    Model,
    DataTypes,
    Op,
    QueryTypes
}