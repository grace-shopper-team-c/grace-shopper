import React from 'react'
import {fetchAllItems, deleteItem} from '../store/items'
import {connect} from 'react-redux'
import AdminSidebar from './AdminSidebar'
import {fetchSingleItem} from '../store/singleItem'

class AdminItems extends React.Component {
  constructor() {
    super()
    this.updateItem = this.updateItem.bind(this)
  }
  componentDidMount() {
    this.props.getItems()
  }

  updateItem(itemId) {
    console.log('update', event.target)
    this.props.getItem(itemId)
    console.log(this.props.history)
    this.props.history.push('/admin/update')
  }

  render() {
    return (
      <div className="main">
        <AdminSidebar />
        <div>
          <div className="welcome">
            <h3>Admin Inventory</h3>
            <h4>{this.props.items.length} items found</h4>
          </div>
          <div className="all_product_container">
            {this.props.items.map(item => {
              return (
                <div className="product" key={item.id}>
                  <div>
                    <img src={item.image} />
                  </div>
                  <div>
                    <div className="main">
                      <h3>{item.name}</h3>
                      <h4>${item.price / 100}</h4>
                    </div>
                    <div className="main">
                      <h4>{item.category}</h4>
                      {item.inventory <= 0 ? (
                        <h3 style={{color: 'red'}}>Out of Stock</h3>
                      ) : (
                        <h4>{item.inventory} in stock</h4>
                      )}
                    </div>
                    <div className="main">
                      <button
                        type="button"
                        onClick={() => this.props.removeItem(item)}
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        onClick={() => this.updateItem(item.id)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  <p>{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
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
    getItems: type => dispatch(fetchAllItems(type)),
    removeItem: item => dispatch(deleteItem(item)),
    getItem: itemId => dispatch(fetchSingleItem(itemId))
  }
}

export default connect(mapState, mapDispatch)(AdminItems)
