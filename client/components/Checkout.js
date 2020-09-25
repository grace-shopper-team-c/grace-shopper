import React from 'react'
import {connect} from 'react-redux'
import {placeOrder} from '../store/order'

class Checkout extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(evt, cart) {
    evt.preventDefault()
    await this.props.placeOrder({fulfilled: true})
  }

  render() {
    return (
      <div className="main">
        Your order includes: Enter shipping address:
        <div className="form-group">
          <input
            type="name"
            className="form-control"
            id="autocomplete"
            placeholder="Name"
          />

          <input
            type="street"
            className="form-control"
            id="autocomplete"
            placeholder="Street"
          />

          <input
            type="city"
            className="form-control"
            id="inputCity"
            placeholder="City"
          />

          <input
            type="state"
            className="form-control"
            id="inputState"
            placeholder="State"
          />

          <input
            type="zip"
            className="form-control"
            id="inputZip"
            placeholder="Zip code"
          />
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
        <button
          type="submit"
          onClick={event => this.handleSubmit(event, this.props.cart)}
        >
          Submit Order
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    placeOrder: cart => dispatch(placeOrder(cart))
  }
}

export default connect(mapState, mapDispatch)(Checkout)
