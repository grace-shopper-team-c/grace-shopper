import React from 'react'
import {fetchAllItems} from '../store/items'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addToCart} from '../store/cart'

class AllItems extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    this.props.getItems()
  }

  async handleAddToCart(evt, item) {
    evt.preventDefault()
    await this.props.addToCart(item)
  }

  render() {
    return (
      <div className="all_product_container">
        {this.props.items.map(item => (
          <Link className="product" to={`/item/${item.id}`} key={item.id}>
            <div>
              <img src={item.image} />
            </div>
            <div>
              <div className="main">
                <h3>{item.name}</h3>
                <h3>${item.price}</h3>
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
    items: state.items
  }
}

const mapDispatch = dispatch => {
  return {
    getItems: () => dispatch(fetchAllItems()),
    addToCart: item => dispatch(addToCart(item))
  }
}

export default connect(mapState, mapDispatch)(AllItems)
