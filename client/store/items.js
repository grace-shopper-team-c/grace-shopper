import axios from 'axios'

const initialItems = []

const GET_ALL_ITEMS = 'GET_ALL_ITEMS'

const getAllItems = items => {
  return {
    type: GET_ALL_ITEMS,
    items: items
  }
}

export const fetchAllItems = type => {
  return async dispatch => {
    try {
      let response
      if (type) {
        response = await axios.get(`/api/items/category/${type}`)
      } else {
        response = await axios.get('/api/items')
      }
      const items = response.data
      dispatch(getAllItems(items))
    } catch (error) {
      console.error(error.message)
    }
  }
}

const itemsReducer = (items = initialItems, action) => {
  switch (action.type) {
    case GET_ALL_ITEMS:
      return action.items
    default:
      return items
  }
}

export default itemsReducer
