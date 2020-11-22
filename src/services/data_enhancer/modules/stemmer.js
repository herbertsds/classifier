const natural = require('natural');

const stemmer = (word) => {
    return natural.PorterStemmerPt.stem(word)
}

module.exports = stemmer