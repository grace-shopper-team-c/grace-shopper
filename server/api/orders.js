const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.send(orders)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body)
    res.send(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
