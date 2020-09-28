const initialFilter = ''

const SET_FILTER = 'SET_FILTER'

export const setFilter = filter => {
  return {
    type: SET_FILTER,
    filter
  }
}

const filterReducer = (filter = initialFilter, action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.filter
    default:
      return filter
  }
}

export default filterReducer
