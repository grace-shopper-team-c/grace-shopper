import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeFromCart} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleRemoval = this.handleRemoval.bind(this)
  }

  async handleRemoval(evt, itemId) {
    evt.preventDefault()
    await this.props.removeFromCart(itemId)
  }

  render() {
    return (
      <div>
        <div>
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
            <Link to={`/products/${item.id}`} key={item.id}>
              <div>
                <img src={item.image} />
              </div>
              <div>
                <h3>{item.name}</h3>
                <h3>{item.price}</h3>
              </div>
              <button
                type="button"
                onClick={event => this.handleRemoval(event, item.id)}
              >
                Remove
              </button>
              {/* add select tag how to increase/decrease purchase quantity*/}
            </Link>
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
    removeFromCart: itemId => dispatch(removeFromCart(itemId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
