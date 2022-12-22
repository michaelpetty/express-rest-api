const mongoose = require('mongoose')

// DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7.
mongoose.set('strictQuery', false)

mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.MONGO_DB_NAME}`)

// Database Connection Error / Success
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', db.client.s.url))
db.on('disconnected', () => console.log('mongo disconnected'))

