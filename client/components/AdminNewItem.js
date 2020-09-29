import React from 'react'
import {connect} from 'react-redux'
import {createOrUpdateItem} from '../store/items'
import AdminSidebar from './AdminSidebar'
import {updateItemInfo} from '../store/singleItem'

//Allows an admin to add or update an item in the inventory
class NewItem extends React.Component {
  constructor() {
    super()
    this.state = {
      validName: true,
      validCat: true,
      validPrice: true,
      validInventory: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange() {
    if (event.target.name === 'price') event.target.value *= 100
    this.props.change({[event.target.name]: event.target.value})
  }

  handleValidation(stateKeys) {
    //matching sure that the item info is valid
    //changing local state so  validation error messages will be shown
    const item = this.props.item
    stateKeys.map(key => this.setState({[key]: true}))
    if (item.category === 'Select a Category') this.setState({validCat: false})
    if (!item.name || item.name === ' ') this.setState({validName: false})
    if (item.price < 1) this.setState({validPrice: false})
    if ((!item.id && item.inventory < 1) || item.inventory < 0)
      this.setState({validInventory: false})
  }

  async handleSubmit() {
    const stateKeys = Object.keys(this.state)
    await this.handleValidation(stateKeys)
    const notValid = stateKeys.filter(input => !this.state[input])
    if (!notValid.length) {
      this.props.handleSubmit(this.props.item)
    }
  }

  render() {
    return (
      <div className="main">
        <AdminSidebar location={this.props.location.pathname} />
        <div className="all_product_container">
          <div className="form-group">
            <label htmlFor="Item Name">
              Name:{' '}
              {this.state.validName ? (
                ''
              ) : (
                <span className="error">Enter a valid Name</span>
              )}
            </label>
            <input
              type="string"
              value={this.props.item.name}
              onChange={() => this.handleChange()}
              name="name"
            />

            <label htmlFor="Item Category">
              Category:{' '}
              {this.state.validCat ? (
                ''
              ) : (
                <span className="error">Select a category</span>
              )}
            </label>
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
            <label htmlFor="Item Price">
              Price:{' '}
              {this.state.validPrice ? (
                ''
              ) : (
                <span className="error">Enter a valid Price</span>
              )}
            </label>
            <input
              type="number"
              value={this.props.item.price / 100}
              onChange={() => this.handleChange()}
              name="price"
              min="0"
            />
            <label htmlFor="Item Inventory">
              Inventory Quantity:{' '}
              {this.state.validInventory ? (
                ''
              ) : (
                <span className="error">Enter a valid Quantity</span>
              )}
            </label>
            <input
              type="number"
              value={this.props.item.inventory}
              onChange={() => this.handleChange()}
              name="inventory"
              min="0"
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
            <button type="button" onClick={() => this.handleSubmit()}>
              {!this.props.item.id ? 'Add Item' : 'Update Item'}
            </button>
          </div>
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
