const productCtl = require('../controllers/productController')
// eventually connect to test db

const mockRequest = (body, params) => {
    return {body, params}
}

const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = (res) => res
    return res 
}

describe('Product Controller routes', () => {
    it('should create a new product', () => {

    })
    it.todo('should return all products')
    it.todo('should get one specific product')
    it.todo('should update one specific product')
    it.todo('should delete one specific product')
})