const router = require('express').Router()
const {Item, OrderItem} = require('../db/models')
const {isAdminMiddleware} = require('./customMiddleware')

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.send(items)
  } catch (error) {
    next(error)
  }
})

router.get('/category/:category', async (req, res, next) => {
  try {
    const items = await Item.findAll({where: {category: req.params.category}})
    if (!items.length) {
      const err = new Error('No items were found')
      err.status = 404
      next(err)
    }
    res.send(items)
  } catch (error) {
    next(error)
  }
})

router.get('/:itemId', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.itemId)
    if (item) {
      res.send(item)
    } else {
      const err = new Error('Item not found')
      err.status = 404
      next(err)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:itemId', isAdminMiddleware, async (req, res, next) => {
  try {
    console.log(
      'I am getting a "null value in column "itemId" violates not-null constraint" error'
    )
    // await Item.destroy({where: {id: req.params.itemId}})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const newItem = await Item.create({
      name: req.body.name,
      category: req.body.category,
      inventory: req.body.inventory,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description
    })
    console.log(newItem)
    res.send(newItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router
