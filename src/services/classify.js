const DateClassifier = require('./classifier/dateClassifier')
const {SetSentimentLib, SentimentClassifier} = require('./classifier/sentimentClassifier')
const {Priorize, Classify} = require('./classifier/synthesize')


const classify = (docs) => {

    sentiment = SetSentimentLib()

    return docs.map((doc) => {

        const dateClassification = DateClassifier(doc)

        const {result, averageScore} = SentimentClassifier(doc, sentiment)

        const Priority = Priorize(result.length, averageScore)

        const Score = Classify(averageScore, dateClassification)
        
        return {
            ...doc,
            Priority,
            Score
        }
    })
}

module.exports = classify