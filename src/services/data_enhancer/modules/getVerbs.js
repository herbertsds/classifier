const conjugar = require("conjugador/dist/conjugador")

const getVerbs = (afinn) => {
    
    const afinn_enhanced = afinn
    Object.keys(afinn).forEach((word) => {
        try{
            const allVerbs = conjugar(word)
            Object.keys(allVerbs).forEach((verbalTime) => {
                allVerbs[verbalTime].forEach((verb) => {
                    if(!(verb in afinn_enhanced)){
                        afinn_enhanced[verb] = afinn_enhanced[word]
                    }
                        
                })
            })
        }catch(e){
            // return;
        }
    })

    return afinn_enhanced
}

module.exports = getVerbs