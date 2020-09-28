import React from 'react'
import {connect} from 'react-redux'
import {getCart, placeOrder} from '../store/cart'
import {updateUser} from '../store/user'
import {Link} from 'react-router-dom'

class Checkout extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const orderId = this.props.user.orderId
    await this.props.placeOrder(orderId)
    this.props.history.push(`/confirmation`)
  }

  async componentDidMount() {
    await this.props.getCart(this.props.user.id)
  }

  render() {
    return (
      <div className="main">
        <div>
          Your order includes:
          {this.props.cart.map(item => (
            <div key={item.id} className="cart">
              <div>
                <img src={item.image} />
              </div>

              <h3>{item.name}</h3>
              <h3>{item.price / 100}</h3>

              <div className="main">
                <label htmlFor="qty">
                  Quantity: {item.order_item.quantity}{' '}
                </label>
              </div>
            </div>
          ))}
          <div className="cart_total">
            <h3>TOTAL: </h3>
            <h3>
              ${' '}
              {this.props.cart
                .reduce((acc, item) => {
                  acc += item.price * item.order_item.quantity / 100
                  return acc
                }, 0)
                .toFixed(2)}
            </h3>
          </div>
        </div>
        <div className="form-group">
          <div className="main">
            <h4>Shipping Address:</h4>
            <div style={{paddingLeft: '1em'}}>
              <p>{this.props.user.address}</p>
              <p>
                {this.props.user.city}, {this.props.user.state}{' '}
                {this.props.user.zip}
              </p>
            </div>
          </div>
          <form
            onSubmit={evt => this.props.updateAddress(evt, this.props.user.id)}
          >
            <h4>Update address:</h4>
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

              <select name="state" className="form-control">
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
        <div>
          Card Number:
          <div className="form-group">
            <input
              type="card"
              className="form-control"
              id="autocomplete"
              placeholder="Card Number"
            />
          </div>
        </div>
        <Link to="/confirmation">
          <button type="submit" onClick={event => this.handleSubmit(event)}>
            Submit Order
          </button>
        </Link>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    placeOrder: orderId => dispatch(placeOrder(orderId)),
    getCart: userId => dispatch(getCart(userId)),
    updateAddress(evt, id) {
      evt.preventDefault()
      const address = evt.target.address.value
      const city = evt.target.city.value
      const state = evt.target.state.value
      const zip = evt.target.zip.value
      dispatch(updateUser(id, {address, city, state, zip}))
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
