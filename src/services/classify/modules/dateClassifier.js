// Quanto mais antigo e próximo da data pivô for o ticket, maior a relevância da data no classificador
// A data pivô deve ser mais antiga que o ticket mais antigo
const DateClassifier = (doc) => {
    
    const pivot = new Date('2016')
    const createdDate = new Date(doc.DateCreate)

    // Calcula a diferença de dias entre a data de criação do ticket e a data pivô
    const dateDiference = (createdDate - pivot) / (1000 * 60 * 60 * 24)

    return dateDiference

}

module.exports = DateClassifier