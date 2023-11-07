let {sequelizecon,Model,DataTypes} = require('../Init/dbconfig')

class User extends Model{}

User.init({
    id:{type:DataTypes.INTEGER,autoIncrement:true,allowNull:false,primaryKey:true},
    name:{type:DataTypes.STRING,allowNull:false},
    email_id:{type:DataTypes.STRING,allowNull:false},
    contact:{type:DataTypes.STRING,allowNull:false},
    password:{type:DataTypes.STRING,allowNull:false},
    otp:{type:DataTypes.STRING,allowNull:true},
    token:{type:DataTypes.STRING(500),allowNull:true},
    is_active:{type:DataTypes.BOOLEAN,defaultValue:true,allowNull:false},
    is_deleted:{type:DataTypes.BOOLEAN,defaultValue:false,allowNull:false}
},{tableName:'user',modelName:'User',sequelize:sequelizecon})

module.exports = {User}