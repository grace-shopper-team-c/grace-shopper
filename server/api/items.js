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

module.exports = router
