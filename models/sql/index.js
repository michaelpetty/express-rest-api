const {Sequelize, DataTypes} = require('sequelize')
// require data models
const ProductModel = require('./Product')
const OrderModel = require('./Order')
const ProductOrderModel = require('./ProductOrder')

const sequelize = new Sequelize(
    process.env.SQL_DB_NAME,
    process.env.SQL_DB_USER,
    process.env.SQL_DB_PASS,
    {
        host: process.env.SQL_DB_HOST,
        dialect: process.env.SQL_DB_DIALECT,
        define: {
            freezeTableName: true
        },
        logging: false
    }
)

sequelize.authenticate()
    .then(res => console.log(`Connected to ${process.env.SQL_DB_NAME}`))
    .catch(err => console.log(`Unable to connect ${process.env.SQL_DB_NAME}`, err))

const Product = ProductModel(sequelize, DataTypes)
const Order = OrderModel(sequelize, DataTypes)
const ProductOrder = ProductOrderModel(sequelize, DataTypes)

Product.belongsToMany(Order, {through: ProductOrder})
Order.belongsToMany(Product, {through: ProductOrder})
Product.hasMany(ProductOrder)
ProductOrder.belongsTo(Product)
Order.hasMany(ProductOrder)
ProductOrder.belongsTo(Order)


module.exports = {
    sequelize,
    Product,
    Order,
    ProductOrder
}