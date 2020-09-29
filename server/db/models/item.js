const Sequelize = require('sequelize')
const db = require('../db')

//Items for sell
const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM('skin', 'hair', 'cleaning', 'candle')
  },
  inventory: {
    type: Sequelize.INTEGER,
    min: 0
  },
  price: {
    type: Sequelize.INTEGER,
    min: 0
  },
  image: Sequelize.STRING,
  description: Sequelize.TEXT
})

//checks if Item has inventory before trying to delete it
Item.beforeDestroy(item => {
  if (!item.inventory) {
    throw new Error('Item still has inventory to sell')
  }
})

module.exports = Item
