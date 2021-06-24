  
const express = require('express')
const cors = require('cors')
const { json } = require('express')

const app = express()

async function serverConnect () {
    app.use(cors())
    app.use(json())
    require('../auth/auth')(app)
    require('../auth/verify-token')(app)
    require('../../../presentation/controllers/user/user-controller')(app)
    


    await app.listen(process.env.SERVER_PORT, ()=>{
        console.log(process.env.SERVER_URL)
    })
}

module.exports = {
    serverConnect
}