import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/singleItem'
import {itemToAdd} from '../store/cart'

//view of one item. Allows customer to enter quanity  and add to cart
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
    this.setState({qty: evt.target.value})
  }

  async handleAddToCart(evt, item) {
    evt.preventDefault()
    await this.props.addToCart(item, this.props.user.id, Number(this.state.qty))
    this.setState({qty: '1'})
  }

  render() {
    const item = this.props.item
    return (
      <div>
        <div className="single_item">
          <div>
            <img src={item.image} />
          </div>
          <div>
            <h2>{item.name}</h2>
            <h3>${item.price / 100}</h3>
            <div>
              <input
                type="number"
                name="qty"
                value={this.state.qty}
                min="1"
                max={item.inventory}
                onChange={this.changeQuantity}
              />
              <button
                type="button"
                onClick={event => this.handleAddToCart(event, item)}
              >
                Add to Cart
              </button>
            </div>
            <p>{item.description}</p>
          </div>
        </div>
        <div />
      </div>
    )
  }
}

const mapState = state => {
  return {
    item: state.singleItem,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getItem: itemId => dispatch(fetchSingleItem(itemId)),
    addToCart: (item, userId, num) => dispatch(itemToAdd(item, userId, num))
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
