// TODO: criar controller

const express = require('express')

require('./db/mongoose')
const loadRouter = require('./routers/load')
const ticketRouter = require('./routers/ticket')

// Setando a API
const app = express()
const port = process.env.port || 3000

// Formata os dados recebidos como JSON com ajuste de limite de payload
app.use(express.json({limit: '250mb'}))

// Registra as rotas para carga de dados 
app.use(loadRouter)

// Registra as rotas para captura de dados 
app.use(ticketRouter)

// Inicia o servidor
app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`)
})