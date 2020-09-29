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

//WILL NEED TO CHANGE THIS ROUTE
// router.put('/order/:orderId', async (req, res, next) => {
//   try {
//     const order = await Order.findByPk(req.params.orderId)
//     await order.update({
//       fulfilled: req.body.fulfilled,
//     })
//     const items = await OrderItem.findAll({
//       where: {orderId: req.params.orderId},
//     })
//     for (let i = 0; i < items.length; i++) {
//       const item = await Item.findByPk(items[i].itemId)
//       const inventory = item.inventory
//       await item.update({
//         inventory: inventory - items[i].quantity,
//       })
//     }
//     res.status(201).end()
//   } catch (error) {
//     next(error)
//   }
// })

//MAY NEED TO CHANGE THIS PATH
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
