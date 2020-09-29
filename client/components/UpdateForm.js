import React from 'react'
import {connect} from 'react-redux'

const UpdateForm = props => {
  return (
    <div className="form-group">
      <div className="main">
        {props.user.address && (
          <div>
            <h4>Shipping Address:</h4>
            <div style={{paddingLeft: '1em'}}>
              <p>{props.user.address}</p>
              <p>
                {props.user.city}, {props.user.state} {props.user.zip}
              </p>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={evt => props.updateAddress(evt, props.user.id)}>
        <h4>{props.user.address ? 'Update address' : 'Enter address'}:</h4>
        <div>
          <input
            name="address"
            type="text"
            className="form-control"
            id="inputStreet"
            placeholder="Street (required)"
            required
          />

          <input
            name="city"
            type="text"
            className="form-control"
            id="inputCity"
            placeholder="City (required)"
            required
          />

          <select name="state" className="form-control" id="inputState">
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
            placeholder="ZIP (required)"
            minLength="5"
            maxLength="10"
            required
          />
        </div>
        <button type="submit">Update Address</button>
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UpdateForm)
