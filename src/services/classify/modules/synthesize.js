/**
 * 
 * Utiliza os resultados para criar a classificação discretizada e contínua
 * 
 */

// Discretizando as prioridades
const Priorize = (countUserMessages, averageScore) => {

    if(countUserMessages === 1 || averageScore < 0)
        return 'Normal'
    
    return 'Alta'
}

// Criando classificação baseada no sentimento e na "idade" do ticket
const Classify = (averageScore, dateClassification) => averageScore / dateClassification

module.exports = {
    Priorize,
    Classify
}