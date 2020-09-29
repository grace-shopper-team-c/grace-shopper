const router = require('express').Router()
const {Item} = require('../db/models')
const {isAdminMiddleware} = require('./customMiddleware')

//GET /api/items/
//Route for getting all items in the data base
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll()
    res.send(items)
  } catch (error) {
    next(error)
  }
})

//GET /api/items/category/:category
//Route for getting items in a specific category
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

//GET /api/items/outOfStock
//Admin only route for getting Items that are out of stock AKA item iteventory = 0
router.get('/outOfStock', isAdminMiddleware, async (req, res, next) => {
  try {
    const items = await Item.findAll({where: {inventory: 0}})
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

//GET /api/items/:itemId
//route for getting a signle item
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

//DELETE /api/items/:itemId
//Admin only route for deleting an Item
//does not currently work due to many to many database association
router.delete('/:itemId', isAdminMiddleware, async (req, res, next) => {
  try {
    await Item.destroy({where: {id: req.params.itemId}})
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//POST /api/items/
//Admin only route for creating an Item
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
    res.send(newItem)
  } catch (error) {
    next(error)
  }
})

//PUT /api/items/:itemId
//Admin only route for updating Item information
router.put('/:itemId', isAdminMiddleware, async (req, res, next) => {
  try {
    const updatedItem = await Item.update(
      {
        name: req.body.name,
        category: req.body.category,
        inventory: req.body.inventory,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description
      },
      {where: {id: req.params.itemId}}
    )
    res.send(updatedItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router
