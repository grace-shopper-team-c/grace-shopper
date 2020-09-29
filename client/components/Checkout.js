import React from 'react'
import {connect} from 'react-redux'
import {getCart, placeOrder} from '../store/cart'
import {updateUser, me} from '../store/user'
import {Link} from 'react-router-dom'

import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js'

import {loadStripe} from '@stripe/stripe-js'
import UpdateForm from './UpdateForm'

const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG')

//Allows customer to verify items in cart
//Allows customer to verify or update shipping address
//Allows customer to enter credit card number
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
    await this.props.getMe()
    await this.props.getCart(this.props.user.id)
  }

  render() {
    // const guestAddress = JSON.parse(localStorage.getItem('guest')).address

    return (
      <div className="main">
        <Elements stripe={stripePromise}>
          <div>
            <h2>Your order includes:</h2>
            {this.props.cart.map(item => (
              <div key={item.id} className="cart">
                <div>
                  <img src={item.image} />
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <h3>${item.price / 100} each</h3>
                  <h3>
                    {' '}
                    Subtotal: ${item.price *
                      item.order_item.quantity /
                      100}{' '}
                  </h3>
                  <h3>Quantity: {item.order_item.quantity}</h3>
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
          <UpdateForm updateAddress={this.props.updateAddress} />
          <div>
            <h2>Card Number:</h2>
            <CardNumberElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4'
                    }
                  },
                  invalid: {
                    color: '#9e2146'
                  }
                }
              }}
            />
            <CardExpiryElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4'
                    }
                  }
                }
              }}
            />
            <CardCvcElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4'
                    }
                  }
                }
              }}
            />
            <Link to="/confirmation">
              <button
                type="submit"
                onClick={event => this.handleSubmit(event)}
                disabled={
                  !this.props.user.address &&
                  !JSON.parse(localStorage.getItem('guest')).cart.length > 0
                }
              >
                Submit Order
              </button>
            </Link>
          </div>
        </Elements>
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
    getMe: () => dispatch(me()),
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
