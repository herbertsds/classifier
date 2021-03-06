/**
 * 
 * Controller responsável por gerenciar as 
 * sugestões do usuário para classificação de termos
 * 
 */

const { classify, crowdsource } = require('../services/classify')
const { writeJson } = require('../services/manipulateFile')
const ticketController = require('./ticketController')

// Salva as sugestões enviadas pelo usuário no arquivo de crowdsourcing
// Reclassifica os tickets se receber o parâmetro 'reclassify'
const saveSuggest = async (req) => {
    
    let classified

    crowdsource(req.body)

    if('reclassify' in req.query){
        classified = classify(require('../data/tickets.json'))
        
        // Escreve classificação no JSON
        // OBS: Apenas arquivos pequenos. Operação de escrita é demorada e idealmente deve ser feita em outro serviço
        if(Object.keys(classified).length < 50)
            writeJson(classified,'src/data/tickets.json')
        
        try {
            await ticketController.deleteMany()
            return await ticketController.populate(classified)
        } catch (error) {
            
        }
    }
    
    return 0
}

module.exports = {
    saveSuggest
}