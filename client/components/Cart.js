import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeFromCart} from '../store/cart'
import {addToCart} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleRemoval = this.handleRemoval.bind(this)
  }

  /* async */ handleAddToCart(evt, item) {
    evt.preventDefault()
    console.log(evt, item)
    //await this.props.addToCart(item, Number(this.state.qty))
  }

  async handleRemoval(evt, itemId) {
    evt.preventDefault()
    await this.props.removeFromCart(itemId)
  }

  render() {
    console.log(this.props.cart)
    return this.props.cart.length === 0 ? (
      <h2 className="cart_total">
        Your cart is currently empty. Show it some love by adding some items.
      </h2>
    ) : (
      <div>
        <div className="cart_total">
          <h3>TOTAL: </h3>
          <h3>
            ${' '}
            {this.props.cart.reduce((acc, item) => {
              acc += Number(item.price)
              return acc
            }, 0)}
          </h3>
        </div>
        <div>
          {this.props.cart.map(item => (
            <div key={item.id} className="cart">
              <div>
                <img src={item.image} />
              </div>

              <h3>{item.name}</h3>
              <h3>{item.price}</h3>

              <div className="main">
                <label htmlFor="qty">Quantity: </label>
                <select
                  name="qty"
                  defaultValue={item.userQuantity}
                  onSelect={evt => this.handleAddToCart(evt, item)}
                >
                  {Array.from(Array(item.quantity)).map((ele, idx) => (
                    <option key={idx} value={idx + 1}>
                      {idx + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={event => this.handleRemoval(event, item.id)}
              >
                Remove
              </button>
              {/* add select tag how to increase/decrease purchase quantity*/}
            </div>
          ))}
        </div>
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
    removeFromCart: itemId => dispatch(removeFromCart(itemId)),
    addToCart: (item, qty) => dispatch(addToCart(item, qty))
  }
}

export default connect(mapState, mapDispatch)(Cart)
