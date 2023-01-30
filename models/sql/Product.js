module.exports = (sequelize, types) => {
    return sequelize.define('product', {
        name: {
            type: types.STRING(255),
            allowNull: false
        },
        descr: types.TEXT
    })
}