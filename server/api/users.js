const router = require('express').Router()
const {User} = require('../db/models')
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
