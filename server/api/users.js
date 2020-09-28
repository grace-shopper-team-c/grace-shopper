const router = require('express').Router()
const {User, Order, OrderItem} = require('../db/models')
const {isAdminMiddleware, isLoggedInUser} = require('./customMiddleware')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
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
router.post('/:userId/orders', async (req, res, next) => {
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
router.put('/:userId', async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.userId)

    if (userToUpdate === null) {
      res.sendStatus(404)
    } else {
      let [updatedRows, updatedUser] = await User.update(req.body, {
        where: {id: req.params.userId},
        returning: true,
        plain: true
      })

      res.send(updatedUser)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/all', isAdminMiddleware, async (req, res, next) => {
  try {
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
