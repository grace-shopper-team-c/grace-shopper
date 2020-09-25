const router = require('express').Router()
const {Item} = require('../db/models')

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

module.exports = router
