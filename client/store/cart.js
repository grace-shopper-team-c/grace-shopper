import axios from 'axios'
import store from './index'
import {addOrderId} from './user'
import {
  resetGuestCart,
  addEachItem,
  filterGuestCart,
  addingToQty,
  newItemQty
} from './cartLocalStorage'

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

const updateCart = item => ({type: UPDATE, item})

export const getCart = userId => {
  return async dispatch => {
    let items
    let orderId
    try {
      const guest = JSON.parse(localStorage.getItem('guest'))
      if (userId === undefined) {
        if (localStorage.getItem('guest')) {
          dispatch(gotCart(guest.cart))
        } else {
          resetGuestCart()
        }
      } else {
        const {data} = await axios.get(`/api/users/${userId}/orders`)
        items = data.items
        orderId = data.order.id
        if (guest.cart.length > 0) {
          addEachItem(guest.cart, userId, orderId, items)
        }
        if (items) {
          dispatch(gotCart(items))
        }
        dispatch(addOrderId(orderId))
      }
      // if (items) {
      //   dispatch(gotCart(items))
      // }
      // dispatch(addOrderId(orderId))
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const itemToAdd = (item, userId, qty) => {
  return async dispatch => {
    try {
      if (userId === undefined) {
        const guest = JSON.parse(localStorage.getItem('guest'))
        const filteredCart = filterGuestCart(guest.cart, item.id)
        let updatedItem
        let newQty = qty ? qty : 1
        if (filteredCart.length === 1) {
          if (qty === undefined) {
            dispatch(
              updateCart(addingToQty(guest.cart, item.id, newQty, updatedItem))
            )
            localStorage.setItem('guest', JSON.stringify(guest))
          } else {
            dispatch(
              updateCart(newItemQty(guest.cart, filteredCart[0].id, newQty))
            )
            localStorage.setItem('guest', JSON.stringify(guest))
          }
        } else {
          item.order_item = {quantity: newQty}
          guest.cart.push(item)
          localStorage.setItem('guest', JSON.stringify(guest))
          dispatch(addToCart(item))
        }
      } else {
        const {cart, user} = store.getState()
        const orderId = user.orderId
        const filteredCart = cart.filter(product => product.id === item.id)
        if (filteredCart.length === 1) {
          const {data} = await axios.put(`/api/order-items/${orderId}`, {
            item,
            qty
          })
          dispatch(updateCart(data))
        } else {
          const {data} = await axios.post(`/api/order-items/${orderId}`, {
            item,
            qty
          })
          item.order_item = data
          dispatch(addToCart(item))
        }
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
        const guest = JSON.parse(localStorage.getItem('guest'))
        guest.cart = filterGuestCart(guest.cart, itemId, 'remove')
        localStorage.setItem('guest', JSON.stringify(guest))
        dispatch(removeFromCart(itemId))
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
