const { JWT } = require('../../../infrastructure/configurations/auth/JWT')

const { 
    userServiceCreate,
    userServiceFindAllActive,
    userServiceFindById,
    userServiceUpdateById,
    userServiceDeleteById
} = require('../../../application/services/user/user-service')

const express = require('express')
const router = express.Router()

router.post('/create',  async ( req, res )=>{

    const response = await userServiceCreate(req.body.id, req.body)

    if(response.error == false){
        res.status(201).send(response)
    } else {
        res.status(500).send(response)
    }
    
})

router.get('/find-all', JWT,  async ( req, res )=>{

    const response = await userServiceFindAllActive()
    if(response.error == false){
        res.status(201).send(response)
    } else {
        res.status(500).send(response)
    }
    
})

router.get('/find-by-id/:id', JWT,  async ( req, res )=>{

    const response = await userServiceFindById(req.params.id)
    if(response.error == false){
        res.status(201).send(response)
    } else {
        res.status(500).send(response)
    }
    
})

router.put('/update/:id', JWT, async ( req, res )=>{

    const response = await userServiceUpdateById(req.params.id, req.body)
    if(response.error == false){
        res.status(201).send(response)
    } else {
        res.status(500).send(response)
    }
    
})

router.delete('/delete/:id', JWT, async ( req, res )=>{

    const response = await userServiceDeleteById(req.params.id)
    if(response.error == false){
        res.status(201).send(response)
    } else {
        res.status(500).send(response)
    }
    
})

module.exports = (app) => app.use('/api/users', router)