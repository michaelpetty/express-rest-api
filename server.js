const express = require('express')
const https = require('https')
const fs = require('fs')
require('dotenv').config()

// connect to mongodb
require('./models/mongo')
// connect to sql db
require('./models/sql')

const cors = require('cors')
const todoRouter = require('./routers/todoRouter')
const productRouter = require('./routers/productRouter')

const PORT = process.env.PORT || 4000
const app = express()

//------- MIDDLEWARE -----------//
app.use(express.static(`${__dirname}/public`))

// parse json in req
app.use(express.json())

// enable all req for now
app.use(cors())

//------- HTML ENDPOINT ---------//
app.get('/', (req, res) => {
    res.sendFile('views/index.html', {
        root: __dirname
    })
})

//------- TODO API ENDPOINT ---------//
app.use('/api/v1/todos', todoRouter)

//------- PRODUCT API ENDPOINT ---------//
app.use('/api/v1/products', productRouter)

// use https if FORCE_HTTPS or on production
if (process.env.FORCE_HTTPS || process.env.NODE_ENV === 'production') {
    // create https server and listen
    const httpsServer = https.createServer({
        key: fs.readFileSync(process.env.HTTPS_KEY_FILE),
        cert: fs.readFileSync(process.env.HTTPS_CERT_FILE)
    }, app)
    httpsServer.listen(PORT, () => console.log(`HTTPS server running on port: ${PORT}`))
} else {
    app.listen(PORT, () => console.log(`HTTP server running on port: ${PORT}`))
}
