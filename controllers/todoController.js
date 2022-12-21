const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

// CRUD for todos

// Index - return all
router.get('/', (req, res) => {
    Todo.find({}, (err, foundTodos) => {
        res.json(foundTodos)
    })
})

// Create 
router.post('/', (req, res) => {
    Todo.create(req.body, (err, createdTodo) => {
        res.json(createdTodo)
    })
})

// Show - return one
router.get('/:id', (req, res) => {
    Todo.findById(req.params.id, (err, foundTodo) => {
        res.json(foundTodo)
    })
})

// Update 
router.put('/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedTodo) => {
        res.json(updatedTodo)
    })
})

// Delete
router.delete('/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id, (err, deletedTodo) => {
        res.json(deletedTodo)
    })
})

module.exports = router