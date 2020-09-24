import React from 'react'
import {fetchAllItems} from '../store/items'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {itemToAdd, getCart} from '../store/cart'

class AllItems extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.getCart(this.props.user.id)
    }
    this.props.getItems()
  }

  async handleAddToCart(evt, item) {
    evt.preventDefault()
    await this.props.addToCart(item, this.props.user.id)
  }

  render() {
    return (
      <div className="all_product_container">
        {this.props.items.map(item => (
          <Link className="product" to={`/${item.id}`} key={item.id}>
            <div>
              <img src={item.image} />
            </div>
            <div>
              <div className="main">
                <h3>{item.name}</h3>
                <h3>${item.price / 100}</h3>
              </div>
              <p>{item.description}</p>
            </div>
            <button
              type="button"
              onClick={event => this.handleAddToCart(event, item)}
            >
              Add to Cart
            </button>
          </Link>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    items: state.items,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getItems: () => dispatch(fetchAllItems()),
    addToCart: (item, userId) => dispatch(itemToAdd(item, userId)),
    getCart: userId => dispatch(getCart(userId))
  }
}

export default connect(mapState, mapDispatch)(AllItems)
