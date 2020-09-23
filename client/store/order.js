import axios from 'axios'

const initialOrders = []

const PLACE_ORDER = 'PLACE_ORDER'

export const placeOrder = cart => ({
  type: PLACE_ORDER,
  cart
})

export const createNewOrder = order => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/orders', order)
      const newOrder = response.data
      dispatch(placeOrder(newOrder))
    } catch (error) {
      console.error(error.message)
    }
  }
}

const ordersReducer = (orders = initialOrders, action) => {
  switch (action.type) {
    case PLACE_ORDER:
      return action.cart
    default:
      return orders
  }
}

export default ordersReducer
