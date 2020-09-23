import axios from 'axios'

const initialState = []

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const addToCart = (item, userQuantity) => {
  if (userQuantity === undefined) userQuantity = 1
  item.userQuantity = userQuantity
  console.log(item)
  return {type: ADD_TO_CART, item}
}

export const removeFromCart = itemId => ({
  type: REMOVE_FROM_CART,
  itemId
})

// export const itemToAdd = (item) => {
//   return (dispatch) => {
//     try {
//       console.log(item)
//       //dispatch(addToCart(item))
//     } catch (error) {
//       console.error(error.message)
//     }
//   }
// }

const cartReducer = (cart = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...cart, action.item]
    case REMOVE_FROM_CART:
      return cart.filter(item => {
        if (item.id !== action.itemId) return item
      })
    default:
      return cart
  }
}

export default cartReducer
