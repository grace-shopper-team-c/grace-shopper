import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/singleItem'

class SingleItem extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    const itemId = this.props.match.params.itemId
    this.props.getItem(itemId)
  }

  addToCart() {
    console.log('added')
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
              <input type="number" name="qty" min="1" />
              <button type="button" onClick={() => this.addToCart()}>
                Add To Cart
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
    getItem: itemId => dispatch(fetchSingleItem(itemId))
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
