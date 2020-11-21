// TODO: passar o classify pro middleware
const Ticket = require('../models/ticket')

// Retorna todos os dados considerando os filtros, ordenações e paginação
const get = async (params) => {
    console.log(params.options)
    try {
        return await Ticket.find(params.filters, null, params.options)
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