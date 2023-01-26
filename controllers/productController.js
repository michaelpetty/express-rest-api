const express = require('express')
const router = express.Router()
// require models

const tmpProducts = [
    {
        id: 1,
        name: 'prod1',
        descr: 'some cool prduct'
    },
    {
        id: 2,
        name: 'prod2',
        descr: 'some nifty prduct'
    },
    {
        id: 3,
        name: 'prod3',
        descr: 'some weird prduct'
    },
]
// CRUD for products
// Index - display all products
router.get('/', (req, res) => {
    res.json(tmpProducts)
})

// Create product

// Show - one product

// Update one product

// Delete one product


module.exports = router