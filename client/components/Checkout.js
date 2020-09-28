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
                placeholder="Street"
              />

              <input
                name="city"
                type="text"
                className="form-control"
                id="inputCity"
                placeholder="City"
              />

              <input
                name="state"
                type="text"
                className="form-control"
                id="inputState"
                placeholder="State"
              />

              <input
                name="zip"
                type="text"
                className="form-control"
                id="inputZip"
                placeholder="ZIP"
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
