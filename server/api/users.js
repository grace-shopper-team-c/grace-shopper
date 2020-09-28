const router = require('express').Router()
const {User, Order, OrderItem} = require('../db/models')
const {isAdminMiddleware, isLoggedInUser} = require('./customMiddleware')
module.exports = router

router.get('/all', isAdminMiddleware, async (req, res, next) => {
  try {
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    let allUsers = await User.findAll({attributes: ['email', 'city', 'state']})
    if (!allUsers.length) {
      let error = new Error('No users found')
      error.status = 404
      next(error)
    } else {
      res.send(allUsers)
    }
  } catch (error) {
    next(error)
  }
})

// /api/users/:userId/orders
router.get('/:userId/orders', isLoggedInUser, async (req, res, next) => {
  try {
    const [order] = await Order.findOrCreate({
      where: {userId: req.params.userId, fulfilled: false},
      include: [OrderItem]
    })
    const items = await order.getItems()
    res.send({items, order})
  } catch (error) {
    next(error)
  }
})

// POST /api/users/:userId/orders
router.post('/:userId/orders', isLoggedInUser, async (req, res, next) => {
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

// PUT /api/users/userId
router.put('/:userId', isLoggedInUser, async (req, res, next) => {
  try {
    let [updatedRows, updatedUser] = await User.update(req.body, {
      where: {id: req.params.userId},
      returning: true,
      plain: true
    })

    if (updatedRows.length === 0) {
      res.sendStatus(404)
    } else {
      res.status(204).send(updatedUser)
    }
  } catch (err) {
    next(err)
  }
})
