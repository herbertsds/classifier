const express = require('express')

const { saveSuggest } = require('../controllers/suggestController')

const router = new express.Router()

// Endpoint para sugerir melhor classificação para um termo (crowdsource)
router.post('/suggest', async (req, res) => {

    const insertedCount = await saveSuggest(req)
    let message

    if (insertedCount > 0)
        message = ` ${insertedCount} documentos reclassificados`
    else
        message = ``

    res.send(`Sugestões incluídas com sucesso.${message}`)
})

module.exports = router