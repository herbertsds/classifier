// TODO: criar controller

const express = require('express')

require('./db/mongoose')
const ticketRouter = require('./routers/ticket')

// Setando a API
const app = express()
const port = process.env.port || 3000

// Formata os dados recebidos como JSON com ajuste de limite de payload
app.use(express.json({limit: '250mb'}))

// Registra as rotas para captura de dados 
app.use(ticketRouter)

// Inicia o servidor
app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`)
})