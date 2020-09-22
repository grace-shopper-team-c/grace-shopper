const router = require('express').Router()
const {Item} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.send(items)
  } catch (error) {
    next(error)
  }
})

module.exports = router
