import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateUser} from '../store/user'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */

export const UserHome = props => {
  const {email, address, city, state, zip, handleSubmit, id, isAdmin} = props

  return (
    <div className="main">
      {isAdmin ? (
        <aside>
          <Link className="filter" to="/admin/users">
            <h2>View All Users</h2>
          </Link>
          <Link className="filter" to="/admin/items">
            <h2>View All Items</h2>
          </Link>
          <Link className="filter" to="/admin/newItem">
            <h2>Add New Item</h2>
          </Link>
        </aside>
      ) : (
        ''
      )}
      <div>
        <h3 className="welcome">Welcome, {email}</h3>
        <div className="form-group">
          <div className="main">
            <h4>Address:</h4>
            <div style={{paddingLeft: '1em'}}>
              <p>{address}</p>
              <p>
                {city}, {state} {zip}
              </p>
            </div>
          </div>
          <form onSubmit={evt => handleSubmit(evt, id)}>
            <h4>Update address:</h4>
            <div>
              <input
                name="address"
                type="text"
                className="form-control"
                id="inputStreet"
                placeholder={address || 'Street'}
              />

              <input
                name="city"
                type="text"
                className="form-control"
                id="inputCity"
                placeholder={city || 'City'}
              />

              <input
                name="state"
                type="text"
                className="form-control"
                id="inputState"
                placeholder={state || 'State'}
              />

              <input
                name="zip"
                type="text"
                className="form-control"
                id="inputZip"
                placeholder={zip || 'ZIP'}
              />
            </div>
            <button type="submit">Update Address</button>
          </form>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    id: state.user.id,
    email: state.user.email,
    address: state.user.address,
    city: state.user.city,
    state: state.user.state,
    zip: state.user.zip,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, id) {
      evt.preventDefault()
      const address = evt.target.address.value
      const city = evt.target.city.value
      const state = evt.target.state.value
      const zip = evt.target.zip.value
      dispatch(updateUser(id, {address, city, state, zip}))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */

UserHome.propTypes = {
  email: PropTypes.string
}
