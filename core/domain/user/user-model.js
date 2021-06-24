const { sequelize, DataTypes } = require('../../infrastructure/configurations/database/database-config')

const User = sequelize.define('user', {
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    active:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
})

module.exports = {
    User
}