const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM('skin', 'hair', 'cleaning', 'candle')
  },
  quantity: {
    type: Sequelize.INTEGER,
    min: 0
  },
  price: {
    type: Sequelize.DECIMAL,
    min: 0
  },
  image: Sequelize.STRING,
  description: Sequelize.TEXT
})

module.exports = Item
