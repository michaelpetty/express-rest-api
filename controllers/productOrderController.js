const { Product, ProductOrder, Order } = require('../models/sql')

module.exports = {
    create: async (req, res) => {
        if (Array.isArray(req.body)) {
            const newOrders = await Order.bulkCreate(req.body)
            return res.json(newOrders)
        } else {
            const newOrder = await Order.create(req.body)
            return res.json(newOrder)
        }
    },
    findAll: async (req, res) => {
        const orders = await Order.findAll({order: [
            ['date', 'DESC']
        ]})
        return res.json(orders)
    },
    findById: async (req, res) => {
        const order = await Order.findByPk(req.params.id, {
            include: [{
                model: ProductOrder,
                include: Product
            }],
            order: [[ProductOrder, Product, 'name', 'ASC']]
        })
        return res.json(order)
    },
    updateWithProduct: async (req, res) => {
        const [poResult, created] = await ProductOrder.findOrCreate({
            where: {
                orderId: req.params.orderId,
                productId: req.body.productId
            },
            defaults: req.body
        })
        if (!created) {
            poResult.update(req.body)
        }
        return res.json(poResult)
    },
    deleteOne: async (req, res) => {
        return res
    },
}