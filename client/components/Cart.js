import React from 'react'
import {connect} from 'react-redux'
import {removeItemFromOrder, getCart, itemToAdd} from '../store/cart'


class Cart extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleRemoval = this.handleRemoval.bind(this)
  }
  componentDidMount() {
    this.props.getCart(this.props.user.id)
  }


  async handleAddToCart(evt, item) {
    await this.props.updateItem(
      item,
      this.props.user.id,
      Number(evt.target.value)
    )
  }

  async handleRemoval(evt, itemId) {
    evt.preventDefault()
    await this.props.removeFromCart(itemId, this.props.user.id)
  }

  render() {
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
            {this.props.cart
              .reduce((acc, item) => {
                acc += item.price * item.order_item.quantity / 100
                return acc
              }, 0)
              .toFixed(2)}
          </h3>
        </div>
        <div>
          {this.props.cart.map((item, idx) => (
            <div key={item.id} className="cart">
              <div>
                <img src={item.image} />
              </div>

              <h3>{item.name}</h3>
              <h3>{item.price / 100}</h3>

              <div className="main">
                <label htmlFor="qty">Quantity: </label>
                <select
                  name="qty"
                  defaultValue={item.order_item.quantity}
                  onChange={evt => this.handleAddToCart(evt, item)}
                >
                  {Array.from(Array(item.inventory)).map((ele, idx) => (
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
            </div>
          ))}
          <Link to="/checkout">
            <button type="submit">Checkout</button>
          </Link>
        </div>
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
    removeFromCart: (itemId, userId) =>
      dispatch(removeItemFromOrder(itemId, userId)),
    getCart: userId => dispatch(getCart(userId)),
    updateItem: (item, userId, qty) => dispatch(itemToAdd(item, userId, qty))
  }
}

export default connect(mapState, mapDispatch)(Cart)
