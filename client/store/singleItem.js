import axios from 'axios'

const inititalItem = {
  id: 0,
  name: '',
  image: '',
  description: '',
  price: 0
}

const SET_ITEM = 'SET_ITEM'

const setItem = item => {
  return {
    type: SET_ITEM,
    item: item
  }
}

export const fetchSingleItem = itemId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/items/${itemId}`)
      const item = response.data
      dispatch(setItem(item))
    } catch (error) {
      console.error(error.message)
    }
  }
}

const singleItemReducer = (item = inititalItem, action) => {
  switch (action.type) {
    case SET_ITEM:
      console.log(action.item)
      return action.item
    default:
      return item
  }
}

export default singleItemReducer