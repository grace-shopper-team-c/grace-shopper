import React from 'react'
import {fetchAllItems} from '../store/items'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {itemToAdd, getCart} from '../store/cart'

//Shows all products that are available for purchase by a customer.
//Only show products that have inventory
class AllItems extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  async componentDidMount() {
    await this.props.getItems()

    await this.props.getCart(this.props.user.id)
  }

  async handleAddToCart(evt, item) {
    evt.preventDefault()
    await this.props.addToCart(item, this.props.user.id)
  }

  render() {
    // filtering out items with no inventory
    const items = this.props.items.filter(item => item.inventory > 0)
    return (
      <div className="all_product_container">
        {items.map(item => (
          <Link className="product" to={`/item/${item.id}`} key={item.id}>
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
