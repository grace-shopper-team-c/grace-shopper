const router = require('express').Router()
const {Order, OrderItem, Item} = require('../db/models')

//PUT /api/orders/order/:orderId
// marks order as fulfilled and decreases item inventory
router.put('/order/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId)
    await order.update({
      fulfilled: req.body.fulfilled
    })
    const items = await OrderItem.findAll({
      where: {orderId: req.params.orderId}
    })
    for (let i = 0; i < items.length; i++) {
      const item = await Item.findByPk(items[i].itemId)
      const inventory = item.inventory
      await item.update({
        inventory: inventory - items[i].quantity
      })
    }
    res.status(201).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
