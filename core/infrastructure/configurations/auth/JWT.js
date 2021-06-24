require('./auth')
const jwt = require('jsonwebtoken')

function JWT(req, res, next){

    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'  ){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
    }else{
        res.status(403)
    }

    jwt.verify(req.token, process.env.SECRET_JWT, (err, decoded) =>{
        if(err) return res.status(403).send({auth:"unauthorized", error:"Token invalid"})

        next()
    })
}

module.exports = {
    JWT
}