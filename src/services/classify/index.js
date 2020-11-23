const DateClassifier = require('./modules/dateClassifier')
const {SetSentimentLib, SentimentClassifier} = require('./modules/sentimentClassifier')
const {Priorize, Classify} = require('./modules/synthesize')
const crowdsource = require('./modules/crowdsource')


const classify = (docs) => {

    sentiment = SetSentimentLib()

    return docs.map((doc) => {

        const dateClassification = DateClassifier(doc)

        const {result, averageScore, doc:newDoc} = SentimentClassifier(doc, sentiment)

        const Priority = Priorize(result.length, averageScore)

        const Score = Classify(averageScore, dateClassification)

        return {
            ...newDoc,
            DateCreate: new Date(doc.DateCreate),
            DateUpdate: new Date(doc.DateUpdate),
            Priority,
            Score
        }
    })
}

module.exports = {
    classify,
    crowdsource
}