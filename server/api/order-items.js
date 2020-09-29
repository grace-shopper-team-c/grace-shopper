const router = require('express').Router()
const {OrderItem} = require('../db/models')

// PUT /api/order-items/:orderId OR /api/order-items/:itemId
router.put('/:orderId', async (req, res, next) => {
  try {
    let newQuantity
    const item = await OrderItem.findOne({
      where: {orderId: req.params.orderId, itemId: req.body.item.id}
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

//POST /api/order-items/:orderId
router.post('/:orderId', async (req, res, next) => {
  try {
    let qty
    if (req.body.qty) {
      qty = req.body.qty
    } else {
      qty = 1
    }
    const item = await OrderItem.create({
      orderId: req.params.orderId,
      itemId: req.body.item.id,
      quantity: qty
    })
    res.send(item)
  } catch (error) {
    next(error)
  }
})

//DELETE /api/order-items/:orderId&:itemId
// Route for removing item from cart
router.delete('/:orderId&:itemId', async (req, res, next) => {
  try {
    await OrderItem.destroy({
      where: {
        orderId: req.params.orderId,
        itemId: req.params.itemId
      }
    })
    res.send(200).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
