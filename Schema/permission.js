let {sequelizecon,Model,DataTypes} = require('../Init/dbconfig')

class Permission extends Model{}

Permission.init({
    id:{type:DataTypes.INTEGER,autoIncrement:true,allowNull:false,primaryKey:true},
    name:{type:DataTypes.STRING,autoIncrement:true,allowNull:false,primaryKey:true},
    is_active:{type:DataTypes.BOOLEAN,defaultValue:true,allowNull:false},
    is_deleted:{type:DataTypes.BOOLEAN,defaultValue:false,allowNull:false}
},{tableName:'permission',modelName:'Permission',sequelize:sequelizecon})

module.exports = {Permission}
