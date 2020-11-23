const natural = require('natural');

// Retira o radical de uma palavra
const stemmer = (word) => {
    return natural.PorterStemmerPt.stem(word)
}

module.exports = stemmer