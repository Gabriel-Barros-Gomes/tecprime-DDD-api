const { User } = require('../../../domain/user/user-model')
const { sequelize , QueryTypes } = require('../../configurations/database/database-config')


async function create( _user ){

    try{

        const response = {
            error: false,
            user: await User.create( _user )
        }
        return response

    }catch(e){

        console.error('User Failed to Create\n', e)
        const response = {
            error: true,
            user: null
        }
        return response

    }

}

async function findAllActive(){

    try{
        const response = {
            error:false,
            users: await sequelize.query('SELECT * FROM public."users" WHERE active = true ORDER BY id ASC;', QueryTypes.SELECT)
        }
        return response

    }catch(e){

        console.error('Users not Founds\n', e)
        const response = {
            error: true,
            erro:e,
            users: []
        }
        return response

    }

}

async function findById( _id ){

    const response = {
        error: true,
        erro: "",
        user: {}
    }

    const user = await User.findByPk(_id)
    if(user === null || user === undefined || user === {} ){
        response.error = true
        console.error('User not Founds\n')
        response.erro = "User not Found"
        return response
    } else {
        response.error = false
        delete response.erro
        response.user = user
        return response
    }

}

async function updateById( _id, _user ){
    const response = {
        error: true,
        erro: "",
        user: {}
    }

    const user = await User.findByPk(_id)
    if(user === null || user === undefined || user === {} ){
        
        response.error = true
        console.error('User not Founds\n')
        response.erro = "User not Found"
        return response

    } else {
        try{

            await User.update( _user, {where: {
                id: _id
            }} )
            response.error = false
            delete response.erro
            response.user = _user
            return response

        }catch(e){

            response.error = true
            console.error('User not Founds\n', e)
            response.erro = e
            return response

        }
        
    }

}

async function deleteById( _id ){

    try{
        const response = {
            error:false,
            users: await sequelize.query(`UPDATE public."users" SET active = false WHERE id = ${_id};`, QueryTypes.SELECT)
        }
        return response

    }catch(e){

        console.error('Users not Founds\n', e)
        const response = {
            error: true,
            erro:e,
            users: []
        }
        return response

    }
    
}

module.exports = {
    create,
    findAllActive,
    findById,
    updateById,
    deleteById
}