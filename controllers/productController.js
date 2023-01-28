// require models
const { Product } = require('../models/sql')

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

module.exports = {
    create: async (req, res) => {
        if (Array.isArray(req.body)) {
            const newProducts = await Product.bulkCreate(req.body)
            return res.json(newProducts)
        } else {
            const newProduct = await Product.create(req.body)
            return res.json(newProduct)
        }
    },
    findAll: async (req, res) => {
        const products = await Product.findAll()
        return res.json(products)
    },
    findOne: async (req, res) => {},
    updateOne: async (req, res) => {},
    deleteOne: async (req, res) => {},
}