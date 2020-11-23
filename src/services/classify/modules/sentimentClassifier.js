const Sentiment = require('sentiment')
const { removeAcentos, removeCedilha } = require('ptbr')

const { labels, changeValue } = require('../data')

// Instanciando o analisador de sentimentos
const sentiment = new Sentiment();

// Adicionando a língua portuguesa
const SetSentimentLib = () => {

    const ptbrLanguage = {
        labels,
        // Analisando palavras que invertem a polaridade de outras palavras
        scoringStrategy: {
            apply: function(tokens, cursor, tokenScore) {
                if (cursor > 0) {
                    const prevtoken = tokens[cursor - 1]
                    
                    let thirdToken = ''
                    if(cursor > 1){
                        thirdToken = tokens[cursor - 2]
                    }

                    if (changeValue[prevtoken] || changeValue[thirdToken]) {
                        tokenScore = -tokenScore
                    }

                    // Caso especial do reclame aqui (palavra composta)
                    if(prevtoken === 'reclame' && tokens[cursor] === 'aqui')
                        tokenScore = -5
                }
                return tokenScore
            }
        }
    }

    sentiment.registerLanguage('ptbr', ptbrLanguage);
}

// Algoritmo de classificação de documentos
// Analisa todas as palavras de cada mensagem do Customer
const SentimentClassifier = (doc) => {
    
    const result = []
    const score = []
    
    // Calcula o sentimento de todas as mensagens do usuário
    doc.Interactions.forEach((interaction) =>  {
        if(interaction.Sender === "Customer"){
            const analyzed = sentiment.analyze(`${removeAcentos(removeCedilha(interaction.Subject)) } ${removeAcentos(removeCedilha(interaction.Message))}`, {language: 'ptbr'})
            result.push(analyzed)
            score.push(analyzed.score)

            // Adicionando as expressões no documento (para ser possível futuro crowdsourcing)
            interaction.Positives = analyzed.positive
            interaction.Negatives = analyzed.negative
        }

        // Aproveita o loop para fazer o parse das datas para o formato correto
        interaction.DateCreate = new Date(interaction.DateCreate)

        
    })

    // Calcula o ânimo global do cliente. As mensagens mais antigas tem peso menor na classificação
    let averageScore = -(Math.round(score.reduce((first, second) => (first + (second * 2))/3 )) + 0.5)

    // Diminui a prioridade de documentos com apenas uma mensagem
    if(result.length === 1)
        averageScore = averageScore < 0 ? averageScore * 1.3 : averageScore / 1.3

    return {doc, result, averageScore}
}

module.exports = {
    SetSentimentLib,
    SentimentClassifier
}