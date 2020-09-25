import axios from 'axios'

import store from './index'
import {addOrderId} from './user'

const initialState = []

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const GOT_CART = 'GOT_CART'
const UPDATE = 'UPDATE'

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

const updateCart = item => ({type: UPDATE, item})

export const getCart = userId => {
  return async dispatch => {
    try {
      if (userId === undefined) {
        // localStorage.setItem('guest', JSON.stringify({guest: 'gaston'}))
        if (localStorage.getItem('guest')) {
          // console.log('BE OUR GUEST')
        } else {
          // console.log('NO GUEST TO SERVE')
        }
        //localStore
        //dispatch(addToCart(item, userQuantity))
      } else {
        const {data} = await axios.get(`/api/orders/${userId}`)
        const items = data.items
        const orderId = data.order.id
        if (items) dispatch(gotCart(items))
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
        //localStore
        //dispatch(addToCart(item, userQuantity))
      }
      //does not yet account for more than 1 of userQuantity
      const {cart, user} = store.getState()
      const orderId = user.orderId
      const filteredCart = cart.filter(product => product.id === item.id)
      if (filteredCart.length === 1) {
        //QUANTITY
        const {data} = await axios.post(`/api/orders/update/${userId}`, {
          item,
          orderId,
          qty
        })
        dispatch(updateCart(data))
      } else {
        const {data} = await axios.post(`/api/orders/${userId}`, {
          item,
          orderId
        })
        item.order_item = data
        dispatch(addToCart(item))
      }
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const removeItemFromOrder = (itemId, userId) => {
  return async dispatch => {
    try {
      if (userId === undefined) {
        //localStore
        //dispatch(removeFromCart(itemId))
      }
      await axios.put(`/api/orders/${userId}`, {itemId})
      dispatch(removeFromCart(itemId))
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
    default:
      return cart
  }
}

export default cartReducer
