const {Sequelize, DataTypes} = require('sequelize')
// require data models
const ProductModel = require('./Product')

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

module.exports = {
    sequelize,
    Product
}