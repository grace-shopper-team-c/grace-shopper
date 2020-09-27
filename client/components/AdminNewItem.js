import React from 'react'
import {connect} from 'react-redux'
import {createOrUpdateItem} from '../store/items'
import AdminSidebar from './AdminSidebar'
import {updateItemInfo} from '../store/singleItem'

class NewItem extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    if (event.target.name === 'price') event.target.value *= 100
    this.props.change({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div className="main">
        <AdminSidebar />
        <div>
          <label htmlFor="Item Name">
            Name:{' '}
            <input
              type="string"
              value={this.props.item.name}
              onChange={() => this.handleChange()}
              name="name"
            />
          </label>
          <label htmlFor="Item Category">Category: </label>
          <select
            onChange={() => this.handleChange()}
            value={this.props.item.category}
            name="category"
          >
            <option value="Select a Category">Select a Category</option>
            <option value="skin" name="skin">
              Skin
            </option>
            <option value="hair" name="hair">
              Hair
            </option>
            <option value="cleaning" name="cleaning">
              Cleaning
            </option>
            <option value="candle" name="candle">
              Candle
            </option>
          </select>
          <label htmlFor="Item Price">Price: </label>
          <input
            type="number"
            value={this.props.item.price / 100}
            onChange={() => this.handleChange()}
            name="price"
          />
          <label htmlFor="Item Inventory">Inventory Quantity: </label>
          <input
            type="number"
            value={this.props.item.inventory}
            onChange={() => this.handleChange()}
            name="inventory"
          />
          <label htmlFor="Item Image Url">Image Url: </label>
          <input
            type="url"
            value={this.props.item.image}
            onChange={() => this.handleChange()}
            name="image"
          />
          <label htmlFor="Item Description">Description:</label>
          <input
            type="text"
            value={this.props.item.description}
            onChange={() => this.handleChange()}
            name="description"
          />
          <button
            type="button"
            onClick={() => this.props.handleSubmit(this.props.item)}
          >
            {!this.props.item.id ? 'Add Item' : 'Update Item'}
          </button>
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

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit: item => dispatch(createOrUpdateItem(item, ownProps.history)),
    change: change => dispatch(updateItemInfo(change))
  }
}

export default connect(mapState, mapDispatch)(NewItem)
