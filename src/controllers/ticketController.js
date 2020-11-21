// TODO: passar o classify pro middleware
const Ticket = require('../models/ticket')
const capitalize = require('capitalize')

// Retorna todos os dados
const get = async (params) => {

    try {
        return await Ticket.find({}, null, {
            limit: parseInt(params.limit),
            skip: parseInt(params.skip) * parseInt(params.limit),
            sort: {
                Score: -1
            }
        })
    } catch (error) {
        throw new Error(error)
    }
    
}


// Conta a quantidade de documentos inseridos
const count = async () => {
    return await Ticket.collection.countDocuments()
}

// Popula a base de dados
const populate = async (data) => {
    
    try {
        const insertedCount = await Ticket.insertData(data)
        return insertedCount

    } catch (error) {
        throw new Error(error)
    }

}

module.exports = {
    get,
    count,
    populate
}