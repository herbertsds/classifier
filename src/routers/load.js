// TODO: async await

const express = require('express')
const assert = require('assert')
const Ticket = require('../models/ticket')

const router = new express.Router()

// Endpoint para carregar e processar os dados recebidos
router.post('/load', (req, res) => {

    // Se nenhum dado for recebido, utiliza os dados padrão
    if (Object.keys(req.body).length === 0)
        req.body = require('../data/tickets.json')
    
    Ticket.collection.insertMany(req.body).then((result) => {
        assert.strictEqual(req.body.length, result.insertedCount);
        res.send(`Documentos processados com sucesso`)
    }).catch((error) => {
        res.status(400).send(error)
    })
})


module.exports = router