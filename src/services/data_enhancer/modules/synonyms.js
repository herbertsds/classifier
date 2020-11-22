const sinonimo = require('sinonimo')

const getSynonyms = async (afinn) => {
    const afinn_enhanced = afinn

    // Faz as operações de capturar o sinônimo em paralelo
    await Promise.allSettled(Object.keys(afinn).map(async (word) => {
        
        // Pega sinônimo apenas de palavras, desconsiderando expressões
        if(word.split(' ').length === 1){
            const synonyms = await sinonimo(word)
            synonyms.forEach((synonym) => {
                if(! (synonyms in afinn_enhanced) )
                    afinn_enhanced[synonyms] = afinn_enhanced[word]
            })
        }
        
    }));
    
    return afinn_enhanced
}

module.exports = getSynonyms