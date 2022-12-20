const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/lorem-ipsum')

// Database Connection Error / Success
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongod not running?'))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))

