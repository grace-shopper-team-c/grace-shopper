import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_ORDER_ID = 'ADD_ORDER_ID'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
export const addOrderId = id => ({type: ADD_ORDER_ID, id})
const updateExistingUser = (address, state, city, zip) => ({
  type: UPDATE_USER,
  address,
  state,
  city,
  zip
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const updateUser = (userId, user, orderId) => {
  return async dispatch => {
    try {
      if (userId === undefined) {
        let guest = JSON.parse(localStorage.getItem('guest'))
        guest.address = user
        localStorage.setItem('guest', JSON.stringify(guest))
      } else {
        const res = await axios.put(`/api/users/${userId}`, user)
        const updatedUser = res.data
        dispatch(
          updateExistingUser(
            updatedUser.address,
            updatedUser.state,
            updatedUser.city,
            updatedUser.zip
          )
        )
      }
    } catch (error) {
      console.error(error.message)
    }
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case ADD_ORDER_ID:
      return {...state, orderId: action.id}
    case UPDATE_USER:
      return {
        ...state,
        address: action.address,
        state: action.state,
        city: action.city,
        zip: action.zip
      }
    default:
      return state
  }
}
