const ticketController = require('../../controllers/ticketController')
const classify = require('../../services/classify') 


// Verifica se há dados na base e a popula se necessário
const populate = async (req, res, next) => {
    
    const documentsCount = await ticketController.count()

    if(documentsCount === 0 || (req.method === 'POST' && req.path === '/tickets') ){
        
        // Se nenhum dado for recebido ou se for uma requisição GET, utiliza os dados padrão
        if (Object.keys(req.body).length === 0 || req.method === 'GET')
            req.body = require('../../data/tickets.json')
        
        
        try {
            req.body = classify(req.body)
            req.insertedCount = await ticketController.populate(req.body)
        } catch (error) {
            res.status(500).send(error)
        }
        
    }

    next()
}

module.exports = populate