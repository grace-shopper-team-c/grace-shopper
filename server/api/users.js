const router = require('express').Router()
const {User} = require('../db/models')
const {isAdminMiddleware, isUser} = require('./customMiddleware')
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

// PUT /api/users/userId
router.put('/:userId', isUser, async (req, res, next) => {
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
