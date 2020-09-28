const express = require('express')

const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const err = new Error('User is not an admin!!!')
    err.status = 403
    next(err)
  }
}

const isUser = (req, res, next) => {
  if (req.user && req.user.id === Number(req.params.userId)) {
    next()
  } else {
    const err = new Error('Wrong Account')
    err.status = 401
    next(err)
  }
}

module.exports = {
  isAdminMiddleware,
  isUser
}
