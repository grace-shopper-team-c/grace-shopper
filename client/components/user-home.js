import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateUser} from '../store/user'
import AdminSidebar from './AdminSidebar'

/**
 * COMPONENT
 */

export const UserHome = props => {
  const {email, address, city, state, zip, handleSubmit, id, isAdmin} = props

  return (
    <div className="all_product_container">
      {isAdmin ? <AdminSidebar /> : ''}
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
                placeholder={address || 'Street (required)'}
                required
              />

              <input
                name="city"
                type="text"
                className="form-control"
                id="inputCity"
                placeholder={city || 'City (required)'}
                required
              />

              <select
                name="state"
                className="form-control"
                required
                id="inputState"
              >
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>

              <input
                name="zip"
                type="text"
                className="form-control"
                id="inputZip"
                placeholder={zip || 'ZIP (required)'}
                minLength="5"
                maxLength="10"
                required
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
