var Sentiment = require('sentiment');

// Instanciando o analisador de sentimentos
const sentiment = new Sentiment();

// Adicionando a língua portuguesa
const SetSentimentLib = () => {

    const ptbrLanguage = {
        labels: require('../data/AFINN/enhanced.json'),
        // scoringStrategy: {
        //   apply: function(tokens, cursor, tokenScore) {
        //     if (cursor > 0) {
        //       var prevtoken = tokens[cursor - 1];
        //       if (prevtoken === 'pas') {
        //         tokenScore = -tokenScore;
        //       }
        //     }
        //     return tokenScore;
        //   }
        // }
    }

    sentiment.registerLanguage('ptbr', ptbrLanguage);
}

const SentimentClassifier = (doc) => {
    
    const result = []
    const score = []
    
    // Calcula o sentimento de todas as mensagens do usuário
    doc.Interactions.forEach((interaction) =>  {
        if(interaction.Sender === "Customer"){
            const analyzed = sentiment.analyze(`${interaction.Subject} ${interaction.Message}`, {language: 'ptbr'})
            result.push(analyzed)
            score.push(analyzed.score)
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