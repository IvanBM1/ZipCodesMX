const config = require('./config')
const express = require('express')
const app = express()

// ENABLE VIEW REQUEST
const morgan = require('morgan')
app.use(morgan('dev'))

// ENABLE CORS
const cors = require('cors')
app.use(cors())

// PARSE BODY REQUEST
const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

// ENABLED RENDER VIEW PUG
app.set('view engine', 'pug')

// SERVER FILES STATIC
app.use(express.static('public'))

// ROUTER
app.use(require('./router'))

// SEND LOGS
if(config.node_env != 'development')
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        success: false,
        error: err.message
    })
})

// 404 NOT FOUND
app.use((req, res, next) => {
    res.status(404)
    if(req.accepts('html')) return res.render('404')
    if(req.accepts('json')) return res.send({error: 'Not found'})
    res.type('txt').send('Not found')
})

// SERVER RUN
app.listen(config.port, () => console.log(`Listen in: ${config.host}:${config.port}`))