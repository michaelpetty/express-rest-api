require('../config/getEnv')
const db = require('../models/sql')

const createDateLS = ({date, days}={}) => {
    const newDate = date || new Date()
    if (days) {
        newDate.setUTCDate(newDate.getUTCDate() + days)
    }
    return newDate.toLocaleString()
}
const randNum = (max) => {
    // console.log('max: ',max)
    return Math.floor(Math.random()*max)
}
const seedProducts = [
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

const seedOrders = [
    {date: createDateLS()},
    {date: createDateLS({days: -1})},
    {date: createDateLS({days: -3})},
    {date: createDateLS({days: -7})},
]

// semi for the IIFE
let itgo;
(async () => {
    console.log(`#### Seeding the ${process.env.SQL_DB_NAME} Database ####`)
    try {
        await db.sequelize.sync({force: true})
        console.log('## database synched ##')
        const products = await db.Product.bulkCreate(seedProducts)
        console.log(`Products created: ${products.length}`)
        const orders = await db.Order.bulkCreate(seedOrders)
        console.log(`Orders created: ${orders.length}`) 
        let poCount = 0
        for (let j=0; j < orders.length; j++) {
            let prodPool = [...products]
            //assoc rand # of products w each order
            let numProds = randNum(products.length)
            poCount += numProds + 1
            for (let i=0; i <= numProds; i++) {
                let [poProd] = prodPool.splice(randNum(prodPool.length), 1)
                const po = await db.ProductOrder.create({
                    orderId: orders[j].id,
                    productId: poProd.id,
                    quantity: randNum(10)+1 
                })
            }
        }
        console.log(`PO entries created: ${poCount}`)
        process.exit()
    } catch (err) {
        console.error('#### Seeding FAILED ####');
        console.error(err);
        process.exit();
    }
})();