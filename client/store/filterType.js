const initialFilter = ''

const SET_FILTER = 'SET_FILTER'

export const setFilter = filter => {
  return {
    type: SET_FILTER,
    filter
  }
}
//Just putting the filter in the redux store so that it can be accessed for styling and keep the code DRY
//AKA not having repeat state on the Sidebar and AdminSidebar
const filterReducer = (filter = initialFilter, action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.filter
    default:
      return filter
  }
}

export default filterReducer
