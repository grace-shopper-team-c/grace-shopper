const db = require('../db')
const User = require('./user')
const Item = require('./item')
const Order = require('./order')

const OrderItem = db.define('order_item', {})

Order.belongsToMany(Item, {through: OrderItem})
Item.belongsToMany(Order, {through: OrderItem})

Order.belongsTo(User)
User.hasMany(Order)

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
