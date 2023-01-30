const express = require('express')
const router = express.Router()
// require models
// const {Product} = require('../models/sql')
const productCtl = require('../controllers/productController')

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
router.get('/', productCtl.findAll)

// Create product(s)
router.post('/', productCtl.create)

// Show - one product
router.get('/:id', productCtl.findById)

// Update one product
router.put('/:id', productCtl.updateOne)

// Delete one product
router.delete('/:id', productCtl.deleteOne)

module.exports = router