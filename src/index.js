/**
 * 
 * Configura e inicializa a API
 * 
 */

const express = require('express')

require('./db/mongoose')
const ticketRouter = require('./routers/ticket')
const suggestRouter = require('./routers/suggest')

// Setando a API
const app = express()
const port = process.env.port || 3000

// Formata os dados recebidos como JSON com ajuste de limite de payload
app.use(express.json({limit: '250mb'}))

// Registra as rotas para captura de dados 
app.use(ticketRouter)

// Registra as rotas para sugestão de termos
app.use(suggestRouter)

// Inicia o servidor
app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`)
})