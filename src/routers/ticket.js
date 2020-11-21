// TODO: javadocs
const express = require('express')

const populate = require('../middleware/populate')
const ticketController = require('../controllers/ticketController')

const router = new express.Router()

// Endpoint para carregar e processar os dados recebidos
router.post('/tickets', populate, async (req, res) => {
    res.send(`Foram inseridos ${req.insertedCount} documentos`)
})

// Endpoint para pegar todos os tickets inseridos
router.get('/tickets', populate, async (req, res) => {
    res.send( await ticketController.get(req.query) )
})

module.exports = router