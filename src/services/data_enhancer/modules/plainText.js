const { removeAcentos, removeCedilha } = require('ptbr')

const plainText = (afinn) => {
    const afinn_enhanced = afinn

    Object.keys(afinn).forEach((word) => {
        const plainWord = removeAcentos(removeCedilha(word))

        if(!(plainWord in afinn_enhanced)){
            afinn_enhanced[plainWord] = afinn[word]
        }
    })

    return afinn_enhanced
}

module.exports = plainText