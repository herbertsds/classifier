/**
 * 
 * Exportando a base de dados melhorada de palavras para classificação
 * 
 */

const labels = require('../data/AFINN/enhanced.json')

// Lista de palavras negativas conhecidas
labels.reclame = -5
labels.reclameaqui = -5
labels.justica = -5
labels.procon = -5

// Exemplo de palavras a serem corrigidas via crowdsourcing (desabilitar aqui para utilizar crowdsourcing)
// Há outros exemplos de palavras identificadas que não foram colocadas aqui para que seja possível testar o crowdsourcing
labels.produto = 0
labels.compra = 0
labels.troquei = 0
labels.trocamos = 0
labels.vez = 0
labels.verificar = 0
labels.contato = 0
labels.programa = 0

// Palavras identificadas com conotação errada pelo contexto
// Também são palavras a serem corrigidas via crowdsourcing (desabilitar aqui para utilizar crowdsourcing)
labels.tentei = - labels.tentei
labels.aguardo = - labels.aguardo
labels.aguardando = - labels.aguardando
labels.aguardamos = - labels.aguardamos
labels.espero = - labels.espero
labels.esperando = - labels.esperando
labels.esperamos = - labels.esperamos

const changeValue = {
    "tomar": "tomar",
    "nao": "nao",
    "aguardo": "aguardo",
    "espero": "espero",
    "esperando": "esperando",
    "aguardando": "aguardando",
    "pode": "pode",
}

module.exports = {
    labels,
    changeValue
}