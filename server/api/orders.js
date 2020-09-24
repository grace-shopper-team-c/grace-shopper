const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')

const isUser = (req, res, next) => {
  if (req.user && req.user.id === Number(req.params.userId)) {
    next()
  } else {
    const err = new Error('Wrong Account')
    err.status = 401
    next(err)
  }
}

//GET or create orders specific to user account
router.get('/:userId', isUser, async (req, res, next) => {
  try {
    const [order, wasCreated] = await Order.findOrCreate({
      where: {userId: req.user.id, fulfilled: false},
      include: [OrderItem]
    })
    if (!wasCreated) {
      const items = await order.getItems()
      res.send({items, order})
    } else {
      res.send(order)
    }
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

//Add items to cart/Update quantity
router.post('/:userId', async (req, res, next) => {
  try {
    const item = await OrderItem.create({
      orderId: req.body.orderId,
      itemId: req.body.item.id
    })
    res.send(item)
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
      .then(response => res.status(200).end())
  } catch (error) {
    next(error)
  }
})

module.exports = router
