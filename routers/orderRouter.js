const express = require('express')
const router = express.Router()

const orderCtl = require('../controllers/productOrderController')

router.get('/', orderCtl.findAll)
router.post('/', orderCtl.create)
router.get('/:id', orderCtl.findById)
router.post('/:orderId/po', orderCtl.updateWithProduct)

module.exports = router