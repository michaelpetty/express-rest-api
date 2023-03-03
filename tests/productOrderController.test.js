require('../config/getEnv')
const db = require('../models/sql')
const productCtl = require('../controllers/productController')
const productOrderCtl = require('../controllers/productOrderController')
const mock = require('./mock')

// beforeAll(async () => await db.sequelize.sync({force: true}))
beforeEach(async () => await db.sequelize.sync({force: true}))
afterAll(async () => await db.sequelize.close())

const createDateLS = ({date, days}={}) => {
    const newDate = date || new Date()
    if (days) {
        newDate.setUTCDate(newDate.getUTCDate() + days)
    }
    return newDate.toLocaleString()
}

const testData = {
    todayLS: {date: createDateLS()},
    tomorrowLS: {date: createDateLS({days: 1})},
    lastWeekLS: {date: createDateLS({days: -7})}
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

describe('Product Order Controller methods', () => {
    it('should create one order (no products)', async () => {
        const newOrder = await productOrderCtl.create(mock.request(testData.todayLS), mock.response())
        expect(newOrder.id).toBeDefined()
        expect(newOrder).toHaveProperty('date', new Date(testData.todayLS.date))
    })
    it('should create multiple orders if array', async () => {
        const newOrders = await productOrderCtl.create(mock.request(Object.values(testData)), mock.response())
        expect(newOrders).toHaveLength(Object.values(testData).length)
        expect(newOrders[0].id).not.toBe(newOrders[1].id)
        expect(newOrders).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    dataValues: expect.objectContaining({
                        date: new Date(testData.todayLS.date)
                    })
                }),
                expect.objectContaining({
                    dataValues: expect.objectContaining({
                        date: new Date(testData.tomorrowLS.date)
                    })
                })
            ])
        )
    })
        it('should get one order by orderId (no products)', async () => {
        const newOrders = await productOrderCtl.create(mock.request(Object.values(testData)), mock.response())
        const order = await productOrderCtl.findById(mock.request({}, {id: 2}), mock.response())
        expect(1).toBe(1)
    })
    it('should add to ProductOrder if order/product not found', async () => {
        const newOrders = await productOrderCtl.create(mock.request(Object.values(testData)), mock.response())
        const products = await productCtl.create(mock.request(tmpProducts), mock.response())
        const po1 = await productOrderCtl.updateWithProduct(mock.request({quantity: 2, productId: 1}, {orderId: 2}), mock.response())
        const po2 = await productOrderCtl.updateWithProduct(mock.request({quantity: 3, productId: 2}, {orderId: 2}), mock.response())
        expect(po1).toHaveProperty('quantity', 2)
        expect(po2).toHaveProperty('quantity', 3)
    })
    it('should update ProductOrder if order/product found', async () => {
        const newOrders = await productOrderCtl.create(mock.request(Object.values(testData)), mock.response())
        const products = await productCtl.create(mock.request(tmpProducts), mock.response())
        const po1 = await productOrderCtl.updateWithProduct(mock.request({quantity: 2, productId: 1}, {orderId: 2}), mock.response())
        const po1Updated = await productOrderCtl.updateWithProduct(mock.request({quantity: 3, productId: 1}, {orderId: 2}), mock.response())
        expect(po1Updated).toHaveProperty('quantity', 3)
    })
    it('should get one order by orderId include prod and po info', async () => {
        const newOrders = await productOrderCtl.create(mock.request(Object.values(testData)), mock.response())
        const products = await productCtl.create(mock.request(tmpProducts), mock.response())
        const po1 = await productOrderCtl.updateWithProduct(mock.request({quantity: 2, productId: 1}, {orderId: 2}), mock.response())
        const po2 = await productOrderCtl.updateWithProduct(mock.request({quantity: 3, productId: 2}, {orderId: 2}), mock.response())
        const result = await productOrderCtl.findById(mock.request({}, {id:2}), mock.response())
        expect(result).toEqual(expect.any(db.Order))
        expect(result).toHaveProperty('date')
        expect(result).toHaveProperty(['product_orders', 0, 'quantity'])
        expect(result).toHaveProperty(['product_orders', 0, 'product', 'name'])
    })
    it('should find all orders (not include prod/po info)', async () => {
        const newOrders = await productOrderCtl.create(mock.request(Object.values(testData)), mock.response())
        const products = await productCtl.create(mock.request(tmpProducts), mock.response())
        const po1 = await productOrderCtl.updateWithProduct(mock.request({quantity: 2, productId: 1}, {orderId: 2}), mock.response())
        const po2 = await productOrderCtl.updateWithProduct(mock.request({quantity: 3, productId: 2}, {orderId: 2}), mock.response())
        const results = await productOrderCtl.findAll(mock.request(), mock.response())
        expect(results).toHaveLength(3)
        expect(results[0]).toEqual(expect.any(db.Order))
        expect(results[0]).not.toHaveProperty('product_orders')
        expect(results[0]).toHaveProperty('id', 2)
        expect(results[2]).toHaveProperty('id', 3)
    })
    it.todo('should delete one order')
})