const conjugar = require("conjugador/dist/conjugador")

// Retorna as conjugações no presente e pretérito perfeito dos verbos da base 
const getVerbs = (afinn) => {
    
    const afinn_enhanced = afinn
    Object.keys(afinn).forEach((word) => {
        try{
            const allVerbs = conjugar(word)
            allVerbs['p'].forEach((verb) => {
                if(!(verb in afinn_enhanced)){
                    afinn_enhanced[verb] = afinn_enhanced[word]
                }
                    
            })
            allVerbs['pp'].forEach((verb) => {
                if(!(verb in afinn_enhanced)){
                    afinn_enhanced[verb] = afinn_enhanced[word]
                }
                    
            })
        }catch(e){
            // return;
        }
    })

    return afinn_enhanced
}

module.exports = getVerbs