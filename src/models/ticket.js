const mongoose = require('mongoose')

// Schema do modelo
const ticketSchema = new mongoose.Schema({
    TicketID: {
        type: Number
    },
    CategoryID: {
        type: Number
    },
    CustomerID: {
        type: Number
    },
    CustomerName: {
        type: String
    },
    CustomerEmail: {
        type: String
    },
    DateCreate: {
        type: Date
    },
    DateUpdate: {
        type: Date
    },
    Interactions: [{
        Subject: {
            type: String
        },
        Message: {
            type: String
        },
        DateCreate: {
            type: Date
        },
        Sender: {
            type: String
        },
        Positives: {
            type: [
                String
            ]
        },
        Negatives:{
            type: [
                String
            ]
        }
    }],
    Priority: {
        type: String
    }
})

// Faz um operação bulk para inserir todos os dados de uma vez na base de dados
ticketSchema.statics.insertData = async (ticketsData) => {

    // Fazer a operação sem ordenação aumenta a performance do bulk insert
    const response = await Ticket.collection.insertMany(ticketsData, {ordered: false})

    if(ticketsData.length !== response.insertedCount)
        throw new Error(`Erro: Foram inseridos ${ticketsData.length} de ${response.insertedCount} documentos`)

    return response.insertedCount
}

// Inicializando o modelo
const Ticket = mongoose.model('Ticket', ticketSchema)





module.exports = Ticket