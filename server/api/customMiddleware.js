const express = require('express')

//checks to see if current user has admin rights
//protects routes from being accessed by non-admin users
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

//checks to see if current user matches the user on the route that was requested
//protects against someone else changing data on a user
const isLoggedInUser = (req, res, next) => {
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
  isLoggedInUser
}
