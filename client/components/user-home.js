import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, address, city, state, zip} = props
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <h4>Update address:</h4>
      <div className="form-group">
        <input
          type="street"
          className="form-control"
          id="autocomplete"
          placeholder={address || 'Street'}
        />

        <input
          type="city"
          className="form-control"
          id="inputCity"
          placeholder={city || 'City'}
        />

        <input
          type="state"
          className="form-control"
          id="inputState"
          placeholder={state || 'State'}
        />

        <input
          type="zip"
          className="form-control"
          id="inputZip"
          placeholder={zip || 'ZIP'}
        />

        <button type="Submit">Update Address</button>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    address: state.user.address,
    city: state.user.city,
    state: state.user.state,
    zip: state.user.zip
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
