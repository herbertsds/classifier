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
        }
    }],
    Priority: {
        type: String
    }
})

// TODO: criar módulo
// Classificação dos tickets
ticketSchema.statics.classify = (ticketsData) => {

    
}

ticketSchema.statics.insertData = async (ticketsData) => {

    const response = await Ticket.collection.insertMany(ticketsData)

    if(ticketsData.length !== response.insertedCount)
        throw new Error(`Erro: Foram inseridos ${ticketsData.length} de ${response.insertedCount} documentos`)

    return response.insertedCount
}

// Modelo
const Ticket = mongoose.model('Ticket', ticketSchema)





module.exports = Ticket