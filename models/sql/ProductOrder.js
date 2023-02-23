module.exports = (sequelize, types) => {
    return sequelize.define('product_order', {
        quantity: {
            type: types.INTEGER, 
            allowNull: false
        }, 
        unit: types.STRING(20)
    })
}