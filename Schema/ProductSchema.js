let {sequelizecon,Model,DataTypes} = require("../Init/dbconfig");
class product extends Model{}
product.init({
    id:{type:DataTypes.INTEGER,autoIncrement:true,allowNull:false,primaryKey:true},
    name:{type:DataTypes.STRING,allowNull:false},
    price:{type:DataTypes.STRING,allowNull:false},
    description:{type:DataTypes.STRING,allowNull:false},
    is_active:{type:DataTypes.BOOLEAN,defaultValue:true,allowNull:false},
    is_deleted:{type:DataTypes.BOOLEAN,defaultValue:false,allowNull:false}
},{tableName:'product',modelName:'User',sequelize:sequelizecon})

module.exports = {product}
