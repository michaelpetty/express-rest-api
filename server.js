const express = require('express')
// connect to mongodb
require('./models')
const todoController = require('./controllers/todoController')
const PORT = process.env.PORT || 4000
const app = express()

//------- MIDDLEWARE -----------//
app.use(express.static(`${__dirname}/public`))

// parse json in req
app.use(express.json())

//------- HTML ENDPOINT ---------//
app.get('/', (req, res) => {
    res.sendFile('views/index.html', {
        root: __dirname
    })
})

//------- TODO API ENDPOINT ---------//
app.use('/api/v1/todos', todoController)

//------- PRODUCT API ENDPOINT ---------//

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
