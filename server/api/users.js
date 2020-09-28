const router = require('express').Router()
const {User} = require('../db/models')
const {isAdminMiddleware} = require('./customMiddleware')
module.exports = router

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
