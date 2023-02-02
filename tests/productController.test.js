require('../config/getEnv')
const db = require('../models/sql')
const productCtl = require('../controllers/productController')

beforeAll(async () => await db.sequelize.sync({force: true}))
afterEach(async () => await db.Product.sync({force: true}))
afterAll(async () => await db.sequelize.close())

const mockRequest = (body, params, query) => {
    return {body, params, query}
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
        name: 'apple',
        descr: 'some cool prduct'
    },
    {
        name: 'banana',
        descr: 'some nifty prduct'
    },
    {
        name: 'orange',
        descr: 'some weird prduct'
    },
]

describe('Product Controller routes', () => {
    it('should create a new product', async () => {
        const newProduct = await productCtl.create(mockRequest(tmpProducts[0]), mockResponse())
        expect(newProduct.id).toBeDefined()
        expect(newProduct).toHaveProperty('name', tmpProducts[0].name)
    })
    it('should create multiple products if array', async () => {
        const newProducts = await productCtl.create(mockRequest(tmpProducts), mockResponse())
        expect(newProducts).toHaveLength(tmpProducts.length)
        expect(newProducts[0].id).not.toBe(newProducts[1].id)
        expect(newProducts[1]).toHaveProperty('name', tmpProducts[1].name)
    })
    it('should return all products', async () => {
        const testProducts = await productCtl.create(mockRequest(tmpProducts), mockResponse())
        const results = await productCtl.findAll(mockRequest(), mockResponse())
        expect(results).toHaveLength(tmpProducts.length)
        expect(results[2]).toHaveProperty('name', tmpProducts[2].name)
    })
    it('should get one specific product', async () => {
        const testProducts = await productCtl.create(mockRequest(tmpProducts), mockResponse())
        const product = await productCtl.findById(mockRequest({}, {id: testProducts[1].id}), mockResponse())
        expect(product).toHaveProperty('name', testProducts[1].name)
        expect(product.descr).toHaveLength(testProducts[1].descr.length)
    })
    it('should find products by searching name/title', async () => {
        const testProducts = await productCtl.create(mockRequest(tmpProducts), mockResponse())
        const results = await productCtl.searchByTitle(mockRequest({}, {}, {title: 'an'}), mockResponse())
        expect(results).toHaveLength(2)
        expect(results).toEqual(
            expect.arrayContaining([
              expect.objectContaining({dataValues: expect.objectContaining({prodid: 2})}),
              expect.objectContaining({dataValues: expect.objectContaining({prodid: 3})})
            ])
        )
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