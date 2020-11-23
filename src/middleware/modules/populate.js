/**
 * 
 * Adiciona os tickets classificados à base de dados do MongoDB
 * 
 */

const ticketController = require('../../controllers/ticketController')
const { classify } = require('../../services/classify') 
const { writeJson } = require('../../services/manipulateFile')


// Verifica se há dados na base e a popula se necessário
const populate = async (req, res, next) => {
    
    const documentsCount = await ticketController.count()

    if(documentsCount === 0 || (req.method === 'POST' && req.path === '/tickets') ){
        
        // Se nenhum dado for recebido ou se for uma requisição GET, utiliza os dados padrão
        if (Object.keys(req.body).length === 0 || req.method === 'GET')
            req.body = require('../../data/tickets.json')
        
        
        try {
            
            // Se enviado como parâmetro, apaga toda a base antes de reinserir os dados
            if('delete_before' in req.query)
                await ticketController.deleteMany()
            
            req.body = classify(req.body)
            

            req.insertedCount = await ticketController.populate(req.body)

            
            
            // Escreve classificação no JSON
            // OBS: Apenas arquivos pequenos. Operação de escrita é demorada e idealmente deve ser feita em outro serviço
            if(await ticketController.count() < 50){
                req.body = await ticketController.findTickets()
                writeJson(req.body,'src/data/tickets.json')
            }
            
        } catch (error) {
            res.status(500).send(error)
        }
        
    }

    next()
}

module.exports = populate