const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

const todos = [
    {
        _id: 1,
        body: 'bake a pie',
        completed: false
    },
    {
        _id: 2,
        body: 'wash dishes',
        completed: false
    },
    {
        _id: 3,
        body: 'walk the dog',
        completed: true
    },
]

// CRUD for todos

// Index - return all
router.get('/', (req, res) => {
    res.json(todos)
})

// Show - return one
router.get('/:id', (req, res) => {
    res.json(todos.find(todo => todo._id === Number(req.params.id)))
})

module.exports = router