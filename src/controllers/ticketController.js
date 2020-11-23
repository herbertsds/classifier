const Ticket = require('../models/ticket')

// Retorna todos os dados considerando os filtros, ordenações e paginação
const get = async (params) => {

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

const deleteMany = async () => {
    await Ticket.deleteMany({})   
}

const findTickets = async () => {
    
    return await Ticket.find({})

}

module.exports = {
    get,
    count,
    populate,
    deleteMany,
    findTickets
}