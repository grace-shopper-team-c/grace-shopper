const router = require('express').Router()
const {User, Order, OrderItem} = require('../db/models')
const {isAdminMiddleware, isLoggedInUser} = require('./customMiddleware')
module.exports = router

//GET /api/users/all
//Admin only route that gets the email address, city and state of all users
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

//GET /api/users/:userId/orders
//gets or creates an unfulfilled order for a user AKA thier current cart
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
//Adds a item to a users current order/cart
//so they can access it if they log in latter without having checkout out with this current order yet
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
//Updating user infomation
router.put('/:userId', isLoggedInUser, async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.userId)

    let updatedUser = await userToUpdate.update(req.body)

    if (userToUpdate === null) {
      res.sendStatus(404)
    } else if (updatedUser) {
      res.send(updatedUser).status(204)
    }
  } catch (err) {
    next(err)
  }
})
