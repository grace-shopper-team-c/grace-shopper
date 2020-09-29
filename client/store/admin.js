import axios from 'axios'

const initialAdmin = []

const GET_ALL_USERS = 'GET_ALL_USERS'

const getAllUsers = allUsers => {
  return {
    type: GET_ALL_USERS,
    allUsers
  }
}
//Admin only route that gets the email addresses and cities for the AdminUser view
export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/users/all')
      const allUsers = response.data
      dispatch(getAllUsers(allUsers))
    } catch (error) {
      console.error(error.message)
    }
  }
}

function adminReducer(admin = initialAdmin, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.allUsers
    default:
      return admin
  }
}

export default adminReducer
