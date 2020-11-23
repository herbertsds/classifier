/**
 * 
 * Formata as palavras
 * 
 */

const { removeAcentos, removeCedilha, ehPreposicao } = require('ptbr')

// Retira acentuação de todas as palavras e remove stopwords
const plainText = (afinn) => {
    const afinn_enhanced = {}

    Object.keys(afinn).forEach((word) => {
        const plainWord = removeAcentos(removeCedilha(word))
        
        if(!ehPreposicao(plainWord) && plainWord.length > 2)
            afinn_enhanced[plainWord] = afinn[word]
    })

    return afinn_enhanced
}

module.exports = plainText