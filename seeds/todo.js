require('dotenv').config()
require('../models/mongo')
const Todo = require('../models/mongo/todo')

const todos = [
    {
        body: "bake a pie",
    },
    {
        body: "wash dishes",
    },
    {
        body: "walk the dog",
        completed: true
    }
];

// Todo.deleteMany({}, (err, result) => {
//     console.log(`Deleted ${result.deletedCount} Todos`)
    
//     Todo.create(todos, (err, createdTodos) => {
//         console.log(`Created ${createdTodos.length} todos`)
//         console.log('Exiting Todo seed ...')
//         process.exit()
//     })
// })

(async () => {
    try {
        const {deletedCount} = await Todo.deleteMany({})
        console.log(`Deleted ${deletedCount} Todos`)
        const createdTodos = await Todo.create(todos)            
        console.log(`Created ${createdTodos.length} todos`)
    } catch (error) {
        console.log('error seeding data: ', error)
    }
    process.exit()
}) ();



