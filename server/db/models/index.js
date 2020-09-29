const db = require('../db')
const User = require('./user')
const Item = require('./item')
const Order = require('./order')
const Sequelize = require('sequelize')

const OrderItem = db.define('order_item', {
  quantity: {type: Sequelize.INTEGER, defaultValue: 1}
})

Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

OrderItem.belongsTo(Item)
Item.hasMany(OrderItem)

Order.belongsToMany(Item, {through: OrderItem})
Item.belongsToMany(Order, {through: OrderItem})

Order.belongsTo(User)
User.hasMany(Order)

Item.beforeDestroy(item => {
  if (!item.inventory) {
    throw new Error('Item still has inventory to sell')
  }
})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  db,
  User,
  Item,
  Order,
  OrderItem
}
