const stemmer = require('./stemmer')
const { readTxt } = require('../../manipulateFile')

// Adiciona palavras do dicionário que possuem o mesmo radical de alguma palavra da base AFINN 
const matchDictFile = async (afinn_stemmed) => {
    
    const afinn_enhanced = {}
    
    const rl = readTxt('src/services/data_enhancer/data/Dicionario/palavras.txt')
 
    for await (const line of rl) {
        
        const stemmed_line = stemmer(line)

        if(stemmed_line in afinn_stemmed){
            afinn_enhanced[line] = afinn_stemmed[stemmed_line]
        }
        
    }

    return afinn_enhanced

}

module.exports = matchDictFile