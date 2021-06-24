const CryptoJS = require("crypto-js")

const {
    create, 
    findAllActive,
    findById,
    updateById,
    deleteById
} = require('../../../infrastructure/repositories/user/user-repository')

const userServiceCreate = async (_id, _user) => {

    let encriptedPassword = CryptoJS.AES.encrypt(_user.password, process.env.SECRET_CRYPTO).toString()
    _user.password = encriptedPassword
    const response = await create(_user)

    return response
    
}

const userServiceFindAllActive = async () => {

    const response0 = await findAllActive()
    
    if(response0.error === false){
        const response = {
            error: response0.error,
            users: response0.users[0]
        }
        return response;
    } else {
        return response0;
    }
    
}

const userServiceFindById = async (_id) => {
    const response = await findById(_id)
    
    return response
}

const userServiceUpdateById = async (_id, _user) => {
    
    let encriptedPassword = CryptoJS.AES.encrypt(_user.password, process.env.SECRET_CRYPTO).toString()
    _user.password = encriptedPassword
    const response = await updateById( _id, _user )
    
    return response
}

const userServiceDeleteById = async ( _id ) => {

    const response0 = await deleteById(_id)
    
    if(response0.error === false){
        const response = {
            error: response0.error,
            users: response0.users[0]
        }
        return response;
    } else {
        return response0;
    }
    
}

module.exports = {
    userServiceCreate,
    userServiceFindAllActive,
    userServiceFindById,
    userServiceUpdateById,
    userServiceDeleteById
}