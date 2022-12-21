const mongoose = require('mongoose')

// create schema for todo documents
const todoSchema = new mongoose.Schema({
    body: {type: String, required: true},
    completed: {type: Boolean, default: false}
})

// create the Todo model
const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo