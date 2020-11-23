/**  
 * 
 * Lista os sinônimos de cada palavra da base e as acrescenta 
 * com o mesmo valor da palavra original.
 * 
 * OBS: essa operação depende de conexão com a internet
 * OBS: a biblioteca dá resultados com ordens diferentes em cada retorno
 * 
 * Portanto, cada execução gerará uma base de dados diferente.
 * 
*/
const sinonimo = require('sinonimo')

// 
const getSynonyms = async (afinn) => {
    const afinn_enhanced = afinn

    // Faz as operações de capturar o sinônimo em paralelo
    await Promise.allSettled(Object.keys(afinn).map(async (word) => {
        
        // Pega sinônimo apenas de palavras, desconsiderando expressões
        if(word.split(' ').length === 1){
            const synonyms = await sinonimo(word)
            synonyms.forEach((synonym) => {
                if(! (synonym in afinn_enhanced) )
                    afinn_enhanced[synonym] = afinn_enhanced[word]
                else if(! (synonym in afinn) && afinn_enhanced[synonym] * afinn_enhanced[word] < 0)
                    afinn_enhanced[synonym] += afinn_enhanced[word]
                
            })
        }
        
    }));
    
    return afinn_enhanced
}

module.exports = getSynonyms