const { Sequelize, DataTypes , QueryTypes } = require('sequelize')


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port:process.env.DB_PORT
  })

async function databaseSync(){ 
    await sequelize.sync({ force: true }) 
}

  module.exports = {
      sequelize,
      DataTypes,
      databaseSync,
      QueryTypes
  }