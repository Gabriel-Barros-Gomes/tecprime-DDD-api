const { User } = require('../../../domain/user/user-model')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const CryptoJS = require("crypto-js")

router.post('/login', async (req, res) =>{
try{

    let _user = await User.findOne({where:{
        email: req.body.email
    }})

    const response = {
        status: "",
        error: ""
    }

    if(_user == null || _user == undefined){
        response.status = "Unauthorized"
        response.error = "User not found"
        res.status(401).send(response)
    }

    let bytes = CryptoJS.AES.decrypt(_user.password, process.env.SECRET_CRYPTO)
    let decriptedPassword = bytes.toString(CryptoJS.enc.Utf8)

    if(!(decriptedPassword == req.body.password)){
        _user = null
    }

    if(_user == null || _user == undefined){
        response.status = "Unauthorized"
        response.error = "Password don't match"
        res.status(401).send(response)
    }
    else{
        const token = jwt.sign({id: _user.id} ,process.env.SECRET_JWT, {expiresIn:600}, (err,token) => {
            res.json({
                token: token,
                user: _user
            })
        })
    }
        
    
}catch(e){
    response.status = "Unauthorized"
    response.error = e
    res.status(401).send(response)
}   

})

module.exports = (app) => app.use('/api/auth', router)