//file to create and export functions related to localStorage of guest cart

import axios from 'axios'

export const resetGuestCart = () => {
  return localStorage.setItem(
    'guest',
    JSON.stringify({name: 'guest', cart: []})
  )
}

export const addEachItem = (guestCart, userId, orderId, items) => {
  guestCart.forEach(async product => {
    await axios.post(`/api/users/${userId}/orders`, {
      product,
      orderId
    })
    items.push(product)
    resetGuestCart()
  })
}

export const filterGuestCart = (guestCart, itemId, type) => {
  if (type === 'remove') {
    return guestCart.filter(product => product.id !== itemId)
  } else {
    return guestCart.filter(product => product.id === itemId)
  }
}

export const addingToQty = (guestCart, itemId, newQty) => {
  let updatedItem
  guestCart.map(product => {
    if (product.id === itemId) {
      product.order_item.quantity = product.order_item.quantity + newQty
      updatedItem = product
    }
    return product
  })
  return {itemId: updatedItem.id, quantity: updatedItem.order_item.quantity}
}

export const newItemQty = (guestCart, filteredCartItemId, newQty) => {
  let updatedItem
  guestCart.map(product => {
    if (product.id === filteredCartItemId) {
      product.order_item.quantity = newQty
      updatedItem = product
    }
    return product
  })
  return {itemId: updatedItem.id, quantity: updatedItem.order_item.quantity}
}
