module.exports = (sequelize, types) => {
    return sequelize.define('order', {
        date: {
            type: types.DATE,
            allowNull: false
        }
    })
}