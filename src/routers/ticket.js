// TODO: async await
const express = require('express')
const assert = require('assert')
const Ticket = require('../models/ticket')

const router = new express.Router()

router.get('/tickets', (req, res) => {
    Ticket.find({}).then((tickets) => {
        res.send(tickets)
    }).catch((error) => {
        res.status(500).send()
    })
})

module.exports = router