const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const Sentry = require('@sentry/node')

// conexao com o banco de dados mongodb na porta default -> 20717
mongoose.connect('mongodb://localhost/monitoria',{ useNewUrlParser: true, useUnifiedTopology: true })
// servico de tracking de erros 
Sentry.init({ dsn: 'https://7b919415007744448b3a90aeb6834ee6@sentry.io/1730187' })
// permite fazer requisicoes de outros dominios
app.use(cors())
// habilita json nas req/res
app.use(express.json())
// aponta o endpoint /files/nomeDaFoto para a pasta com as fotos
app.use('/files', express.static(path.resolve(__dirname,'..','uploads','resized')))



// todas os controllers em caso de excecao passam o erro para a proxima funcao com o parametro next()
app.use(Sentry.Handlers.requestHandler())
app.use(require('./routes'))
// a proxima funcao a ser chamada seria o handler do sentry
app.use(Sentry.Handlers.errorHandler())
app.listen('3000', () => console.log('server on port 3000'))