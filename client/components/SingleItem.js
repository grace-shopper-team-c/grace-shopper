import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/singleItem'
import {addToCart} from '../store/cart'

class SingleItem extends React.Component {
  constructor() {
    super()
    this.state = {
      qty: '1'
    }
    this.changeQuantity = this.changeQuantity.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    const itemId = this.props.match.params.itemId
    this.props.getItem(itemId)
  }

  changeQuantity(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  async handleAddToCart(evt, item) {
    evt.preventDefault()
    await this.props.addToCart(item, Number(this.state.qty))
  }

  render() {
    const item = this.props.item
    return (
      <div>
        <div>
          <div>
            <img src={item.image} />
          </div>
          <div>
            <h2>{item.name}</h2>
            <h3>${item.price}</h3>
            <div>
              <input
                type="number"
                name="qty"
                value={this.state.qty}
                min="1"
                max={item.quantity}
                onChange={this.changeQuantity}
              />
              <button
                type="button"
                onClick={event => this.handleAddToCart(event, item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div>
          <p>{item.description}</p>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    item: state.singleItem
  }
}

const mapDispatch = dispatch => {
  return {
    getItem: itemId => dispatch(fetchSingleItem(itemId)),
    addToCart: (item, qty) => dispatch(addToCart(item, qty))
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
