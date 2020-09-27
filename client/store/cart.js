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
        if (localStorage.getItem('guest')) {
          const guest = JSON.parse(localStorage.getItem('guest'))
          dispatch(gotCart(guest.cart))
        } else {
          localStorage.setItem(
            'guest',
            JSON.stringify({name: 'guest', cart: []})
          )
        }
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
        //guest
        const guest = JSON.parse(localStorage.getItem('guest'))
        const filteredCart = guest.cart.filter(
          product => product.id === item.id
        )
        let updatedItem
        let newQty = qty ? qty : 1
        if (filteredCart.length === 1) {
          if (qty === undefined) {
            //update qty of product in cart with +1 of what is already in cart if no qty
            //DOES UPDATE, BUT NEED TO REFRESH TO SEE UPDATE..., or leave cart page and come back
            guest.cart.map(product => {
              if (product.id === item.id) {
                product.order_item.quantity =
                  product.order_item.quantity + newQty
                updatedItem = product
              }
              return product
            })
            localStorage.setItem('guest', JSON.stringify(guest))
            dispatch(
              updateCart({
                itemId: updatedItem.id,
                quantity: updatedItem.order_item.quantity
              })
            )
          } else {
            //update qty of product already in cart to qty passed in
            //DOES UPDATE, BUT NEED TO REFRESH TO SEE UPDATE..., or leave cart page and come back
            guest.cart.map(product => {
              if (product.id === filteredCart[0].id) {
                product.order_item.quantity = newQty
                updatedItem = product
              }
              return product
            })
            localStorage.setItem('guest', JSON.stringify(guest))
            dispatch(
              updateCart({
                itemId: updatedItem.id,
                quantity: updatedItem.order_item.quantity
              })
            )
          }
        } else {
          //adding new product with no qty passed in, default to 1
          //adding new product with qty passed in
          item.order_item = {quantity: newQty}
          guest.cart.push(item)
          localStorage.setItem('guest', JSON.stringify(guest))
          dispatch(addToCart(item))
        }
      } else {
        //logged in user
        const {cart, user} = store.getState()
        const orderId = user.orderId
        const filteredCart = cart.filter(product => product.id === item.id)
        if (filteredCart.length === 1) {
          const {data} = await axios.post(`/api/orders/update/${userId}`, {
            item,
            orderId,
            qty
          })
          dispatch(updateCart(data))
        } else {
          const {data} = await axios.post(`/api/orders/${userId}`, {
            item,
            orderId,
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

export const removeItemFromOrder = (itemId, userId) => {
  return async dispatch => {
    try {
      if (userId === undefined) {
        const guest = JSON.parse(localStorage.getItem('guest'))
        const removedItemFromCart = guest.cart.filter(product => {
          if (product.id !== itemId) return product
        })
        guest.cart = removedItemFromCart
        localStorage.setItem('guest', JSON.stringify(guest))
        dispatch(removeFromCart(itemId))
      } else {
        await axios.put(`/api/orders/${userId}`, {itemId})
        dispatch(removeFromCart(itemId))
      }
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
