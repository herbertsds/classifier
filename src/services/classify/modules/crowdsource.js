/**
 * 
 * Módulo que calcula os valores das expressões para classificação baseados nas sugestões
 * 
 */

const { removeAcentos, removeCedilha } = require('ptbr')
const decamelize = require('decamelize');

const data = require('../data/crowdsource/crowdsource.json')
const db = require('../data/AFINN/enhanced.json')
const { writeJsonSync } = require('../../manipulateFile')

// Calcula o novo valor de classificação de cada palavra da requisição
// O novo valor será a média entre o valor original e todas as sugestões
const crowdsource = (req) => {
    Object.keys(req).forEach(word => {
        
        plainWord = decamelize(removeAcentos(removeCedilha(word)))
        
        if(! (plainWord in data)){
            data[plainWord] = [0,0]
        }
        
        data[plainWord][1]++

        data[plainWord][0] = data[plainWord][0] + req[word]

        db[plainWord] = ( db[plainWord] + data[plainWord][0] ) / (data[plainWord][1] + 1)
        
    });
    writeJsonSync(data, 'src/services/classify/data/crowdsource/crowdsource.json')
    writeJsonSync(db, 'src/services/classify/data/AFINN/enhanced.json')
    
}

module.exports = crowdsource