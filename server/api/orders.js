const router = require('express').Router()
const {Order, OrderItem, Item} = require('../db/models')
const {isUser} = require('./customMiddleware')

//GET or create orders specific to user account
router.get('/:userId', isUser, async (req, res, next) => {
  try {
    const [order, wasCreated] = await Order.findOrCreate({
      where: {userId: req.user.id, fulfilled: false},
      include: [OrderItem]
    })
    const items = await order.getItems()
    res.send({items, order})
  } catch (error) {
    next(error)
  }
})

router.post('/addGuestCart/:userId', async (req, res, next) => {
  try {
    await OrderItem.create({
      orderId: req.body.orderId,
      itemId: req.body.product.id,
      quantity: req.body.product.order_item.quantity
    })
    res.status(200).end()
  } catch (error) {
    next(error)
  }
})

router.post('/update/:userId', async (req, res, next) => {
  try {
    let newQuantity
    const item = await OrderItem.findOne({
      where: {orderId: req.body.orderId, itemId: req.body.item.id}
    })
    if (req.body.qty) {
      newQuantity = req.body.qty
    } else {
      newQuantity = item.quantity + 1
    }
    item.quantity = newQuantity
    const updatedItem = await item.save()
    res.send(updatedItem)
  } catch (error) {
    next(error)
  }
})

//Add items to cart
router.post('/:userId', async (req, res, next) => {
  try {
    let qty
    if (req.body.qty) {
      qty = req.body.qty
    } else {
      qty = 1
    }
    const item = await OrderItem.create({
      orderId: req.body.orderId,
      itemId: req.body.item.id,
      quantity: qty
    })
    res.send(item)
  } catch (error) {
    next(error)
  }
})

// change order to fulfilled and sell items
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

//remote item from cart
router.put('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {userId: req.params.userId, fulfilled: false}
    })
    await order
      .removeItem(req.body.itemId)
      .then(response => res.status(201).end())
  } catch (error) {
    next(error)
  }
})

module.exports = router
