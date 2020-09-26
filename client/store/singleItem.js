import axios from 'axios'

const inititalItem = {
  id: 0,
  name: '',
  image: '',
  description: '',
  price: 0,
  category: 'Select a Category',
  inventory: 0
}

const SET_ITEM = 'SET_ITEM'
const UPDATE_ITEM_INFO = 'UPDATE_ITEM_INFO'

const setItem = item => {
  return {
    type: SET_ITEM,
    item: item
  }
}

export const updateItemInfo = change => {
  return {
    type: UPDATE_ITEM_INFO,
    change
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
      return action.item
    case UPDATE_ITEM_INFO:
      return {...item, ...action.change}
    default:
      return item
  }
}

export default singleItemReducer
