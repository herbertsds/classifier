const { removeAcentos, removeCedilha } = require('ptbr')
const decamelize = require('decamelize');

const data = require('../data/crowdsource/crowdsource.json')
const db = require('../data/AFINN/enhanced.json')
const { writeJsonSync } = require('../../manipulateFile')

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