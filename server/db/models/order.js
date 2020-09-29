const Sequelize = require('sequelize')
const db = require('../db')

//Orders that have been placed  => fulfilled = true
//User current carts => fulfilled = false
const Order = db.define('order', {
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
