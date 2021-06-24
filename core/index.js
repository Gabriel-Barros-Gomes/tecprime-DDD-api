require('dotenv').config()

const { sequelize, databaseSync} = require('./infrastructure/configurations/database/database-config')
const { serverConnect } = require('./infrastructure/configurations/server/server-config')

async function startApi(){

    try{
        sequelize.authenticate()
        //databaseSync() //this only will be activate to sync database tables
        console.log('Database connected successfully')
    }catch(e){
        console.error(e,'Database connection failed')
    }

    try{
        await serverConnect()
        console.log('Server connected successfully')
    }catch(e){
        console.error(e,'Server connection failed')
    }

}

startApi()//this only be activate to start API