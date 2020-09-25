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
    res.send(items)
  } catch (error) {
    next(error)
  }
})

router.get('/:itemId', async (req, res, next) => {
  try {
    const item = await Item.findOne({
      where: {
        id: req.params.itemId
      }
    })
    res.send(item)
  } catch (error) {
    next(error)
  }
})

module.exports = router
