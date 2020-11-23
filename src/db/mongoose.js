const mongoose = require('mongoose')

// Conectando ao banco de dados
mongoose.connect('mongodb://127.0.0.1:27017/classifier', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})