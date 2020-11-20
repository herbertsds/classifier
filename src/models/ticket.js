const mongoose = require('mongoose')

// Tickets model
const Ticket = mongoose.model('Ticket', {
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
    }]
})


// Ticket.collection.insertMany(ticketsData).then((r) => {
//     assert.equal(ticketsData.length, r.insertedCount);
//     // Finish up test
//     // db.close();
// });


module.exports = Ticket