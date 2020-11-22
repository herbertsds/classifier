const labels = require('../data/AFINN/enhanced.json')

// Lista de palavras negativas conhecidas
labels.reclame = -5
labels.reclameaqui = -5
labels.justica = -5
labels.procon = -5

// Palavras identificadas com conotação errada pelo contexto
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