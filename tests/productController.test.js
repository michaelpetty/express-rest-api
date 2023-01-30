// eventually connect to test db
require('dotenv').config()
const db = require('../models/sql')
const productCtl = require('../controllers/productController')

beforeAll(async () => await db.sequelize.sync({force: true}))
afterEach(async () => await db.Product.sync({force: true}))
afterAll(async () => await db.sequelize.close())

const mockRequest = (body, params) => {
    return {body, params}
}

const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = (res) => res
    return res 
}

// mock data
const tmpProducts = [
    {
        name: 'prod1',
        descr: 'some cool prduct'
    },
    {
        name: 'prod2',
        descr: 'some nifty prduct'
    },
    {
        name: 'prod3',
        descr: 'some weird prduct'
    },
]

describe('Product Controller routes', () => {
    it('should create a new product', async () => {
        const newProduct = await productCtl.create(mockRequest(tmpProducts[0]), mockResponse())
        expect(newProduct.id).toBeDefined()
        expect(newProduct.name).toBe('prod1')
    })
    it('should create multiple products if array', async () => {
        const newProducts = await productCtl.create(mockRequest(tmpProducts), mockResponse())
        expect(newProducts).toHaveLength(tmpProducts.length)
        expect(newProducts[0].id).not.toBe(newProducts[1].id)
        expect(newProducts[1].name).toBe('prod2')
    })
    it('should return all products', async () => {
        const testProducts = await productCtl.create(mockRequest(tmpProducts), mockResponse())
        const results = await productCtl.findAll(mockRequest(), mockResponse())
        expect(results).toHaveLength(tmpProducts.length)
        expect(results[2].name).toBe('prod3')
    })
    it('should get one specific product', async () => {
        const testProducts = await productCtl.create(mockRequest(tmpProducts), mockResponse())
        const product = await productCtl.findById(mockRequest({}, {id: testProducts[1].id}), mockResponse())
        expect(product.name).toBe('prod2')
        expect(product.descr).toHaveLength(17)
    })
    it('should update one specific product', async () => {
        const testProducts = await productCtl.create(mockRequest(tmpProducts), mockResponse())
        const {dataValues: updatedProduct} = await productCtl.updateOne(mockRequest({
            name: 'new Product 1'
        }, {id: testProducts[0].id}), mockResponse())
        expect(updatedProduct.id).toBe(testProducts[0].id)
        expect(updatedProduct.name).toBe('new Product 1')
        expect(updatedProduct.descr).toBe(testProducts[0].descr)
    })
    it('should delete one specific product', async () => {
        const testProducts = await productCtl.create(mockRequest(tmpProducts), mockResponse())
        const {deleted: deletedCount} = await productCtl.deleteOne(mockRequest({}, {id: testProducts[2].id}), mockResponse())
        const productsAfterDelete = await productCtl.findAll(mockRequest(), mockResponse())
        expect(deletedCount).toBe(1)
        expect(productsAfterDelete).toHaveLength(2)
        const reqDeletedProduct = await productCtl.findById(mockRequest({}, {id: testProducts[2].id}), mockResponse())
        expect(reqDeletedProduct.message).toBe('Product not found')
    })
})