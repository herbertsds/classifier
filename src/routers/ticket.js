// TODO: async await
// TODO: javadocs
const express = require('express')
const assert = require('assert')

const Ticket = require('../models/ticket')
const classify = require('../services/classify') 

const router = new express.Router()

// Endpoint para carregar e processar os dados recebidos
router.post('/tickets', async (req, res) => {

    // Se nenhum dado for recebido, utiliza os dados padrão
    if (Object.keys(req.body).length === 0)
        req.body = require('../data/tickets.json')
    
    try {
        // const insertedCount = await Ticket.insertData(req.body)
        const insertedCount = await Ticket.insertData(classify(req.body))
        res.send(`${insertedCount} documentos inseridos com sucesso`)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})

// Endpoint para pegar todos os tickets inseridos
router.get('/tickets', (req, res) => {
    Ticket.find({}).then((tickets) => {
        res.send(tickets)
    }).catch((error) => {
        res.status(500).send()
    })
})

module.exports = router