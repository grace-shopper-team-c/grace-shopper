import axios from 'axios'
import store from './index'
import {addOrderId} from './user'
import {
  addEachItem,
  removeGuestItem,
  guestItemToAdd,
  getGuestCart,
  userItemToAdd
} from './cartFunctions'

const initialState = []

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const GOT_CART = 'GOT_CART'
const UPDATE = 'UPDATE'
const PLACE_ORDER = 'PLACE_ORDER'

export const addToCart = item => {
  return {type: ADD_TO_CART, item}
}

export const gotCart = items => ({
  type: GOT_CART,
  items
})

export const removeFromCart = itemId => ({
  type: REMOVE_FROM_CART,
  itemId
})

const confirmOrder = orderId => ({
  type: PLACE_ORDER,
  orderId
})

export const updateCart = item => ({type: UPDATE, item})

export const getCart = userId => {
  return async dispatch => {
    try {
      if (userId === undefined) {
        const answer = getGuestCart()
        if (answer) {
          dispatch(answer)
        }
      } else {
        const {data} = await axios.get(`/api/users/${userId}/orders`)
        const items = data.items
        const orderId = data.order.id
        addEachItem(userId, orderId, items)
        if (items) {
          dispatch(gotCart(items))
        }
        dispatch(addOrderId(orderId))
      }
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const itemToAdd = (item, userId, qty) => {
  return async dispatch => {
    try {
      if (userId === undefined) {
        dispatch(guestItemToAdd(item, qty))
      } else {
        const {cart, user} = store.getState()
        const orderId = user.orderId
        dispatch(await userItemToAdd(cart, orderId, item, qty))
      }
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const removeItemFromOrder = (itemId, orderId) => {
  return async dispatch => {
    try {
      if (orderId === undefined) {
        dispatch(removeFromCart(removeGuestItem(itemId)))
      } else {
        await axios.delete(`/api/order-items/${orderId}&${itemId}`)
        dispatch(removeFromCart(itemId))
      }
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const placeOrder = orderId => {
  return async dispatch => {
    try {
      await axios.put(`/api/orders/order/${orderId}`, {fulfilled: true})
      dispatch(confirmOrder(orderId))
    } catch (error) {
      console.error(error.message)
    }
  }
}

const cartReducer = (cart = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...cart, action.item]
    case GOT_CART:
      return action.items
    case UPDATE:
      return cart.map(item => {
        if (item.id === action.item.itemId) {
          item.order_item.quantity = action.item.quantity
        }
        return item
      })
    case REMOVE_FROM_CART:
      return cart.filter(item => {
        if (item.id !== action.itemId) return item
      })
    case PLACE_ORDER:
      return initialState
    default:
      return cart
  }
}

export default cartReducer
