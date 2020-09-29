//file to create and export functions related to guest cart

import axios from 'axios'
import {updateCart, addToCart, gotCart} from './cart'

//both guest and logged in user functions

export const filterCart = (cart, itemId, type) => {
  if (type === 'remove') {
    return cart.filter(product => product.id !== itemId)
  } else {
    return cart.filter(product => product.id === itemId)
  }
}

// guest-localStorage functions

export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('guest'))
}

export const resetGuestCart = () => {
  return localStorage.setItem(
    'guest',
    JSON.stringify({name: 'guest', cart: []})
  )
}

export const addEachItem = (userId, orderId, items) => {
  const guest = getLocalStorage()
  if (guest.cart.length > 0) {
    guest.cart.forEach(async product => {
      await axios.post(`/api/users/${userId}/orders`, {
        product,
        orderId
      })
      items.push(product)
      resetGuestCart()
    })
  }
}

export const getGuestCart = () => {
  const guest = getLocalStorage()
  if (guest) {
    return gotCart(guest.cart)
  } else {
    resetGuestCart()
  }
}

export const addingToQty = (guestCart, itemId, newQty, type) => {
  let updatedItem
  if (type === 'add') {
    guestCart.map(product => {
      if (product.id === itemId) {
        product.order_item.quantity = product.order_item.quantity + newQty
        updatedItem = product
      }
      return product
    })
  } else if (type === 'newQty') {
    guestCart.map(product => {
      if (product.id === itemId) {
        product.order_item.quantity = newQty
        updatedItem = product
      }
      return product
    })
  }

  return {itemId: updatedItem.id, quantity: updatedItem.order_item.quantity}
}

export const guestItemToAdd = (item, qty) => {
  const guest = getLocalStorage()
  let newQty = qty ? qty : 1
  let itemInfo
  if (filterCart(guest.cart, item.id).length === 1) {
    if (qty === undefined) {
      itemInfo = updateCart(addingToQty(guest.cart, item.id, newQty, 'add'))
      localStorage.setItem('guest', JSON.stringify(guest))
    } else {
      itemInfo = updateCart(addingToQty(guest.cart, item.id, newQty, 'newQty'))
      localStorage.setItem('guest', JSON.stringify(guest))
    }
  } else {
    item.order_item = {quantity: newQty}
    itemInfo = addToCart(item)
    guest.cart.push(item)
    localStorage.setItem('guest', JSON.stringify(guest))
  }
  return itemInfo
}

export const removeGuestItem = itemId => {
  const guest = getLocalStorage()
  guest.cart = filterCart(guest.cart, itemId, 'remove')
  localStorage.setItem('guest', JSON.stringify(guest))
  return itemId
}

// logged in user functions

export const userItemToAdd = async (cart, orderId, item, qty) => {
  let itemInfo
  if (filterCart(cart, item.id).length === 1) {
    const {data} = await axios.put(`/api/order-items/${orderId}`, {
      item,
      qty
    })
    itemInfo = updateCart(data)
  } else {
    const {data} = await axios.post(`/api/order-items/${orderId}`, {
      item,
      qty
    })
    item.order_item = data
    itemInfo = addToCart(item)
  }

  return itemInfo
}
