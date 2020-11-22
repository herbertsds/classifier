const matchDictFile = require('./modules/matchDictFile')
const stemmer = require('./modules/stemmer')
const getSynonyms = require('./modules/synonyms')
const getVerbs = require('./modules/getVerbs')
const plainText = require('./modules/plainText')
const { writeJson } = require('../manipulateFile')


const afinn = require('../classify/data/AFINN/en/translated.json')

// Módulo responsável por melhorar a base AFINN inicial
const data_enhancer = async () => {
    const afinn_stemmed = {}
    let afinn_enhanced = afinn

    // Stemmiza todas as palavras do AFINN
    Object.keys(afinn).forEach((word) => {
        afinn_stemmed[stemmer(word)] = afinn[word]
    })

    console.time('matchDict')
    afinn_enhanced = await matchDictFile(afinn_stemmed)
    console.timeEnd('matchDict')

    console.time('getSynonyms')
    afinn_enhanced = await getSynonyms(afinn_enhanced)
    console.timeEnd('getSynonyms')

    console.time('getVerbs')
    afinn_enhanced = getVerbs(afinn_enhanced)
    console.timeEnd('getVerbs')

    console.time('plainText')
    afinn_enhanced = plainText(afinn_enhanced)
    console.timeEnd('plainText')

    writeJson(afinn_enhanced, 'src/services/classify/data/AFINN/enhanced.json')

    console.log(`Base aumentada de ${Object.keys(afinn).length} expressões para ${Object.keys(afinn_enhanced).length} expressões`)

    

}

data_enhancer()





