import React from 'react'
import {fetchAllItems} from '../store/items'
import {connect} from 'react-redux'
import Sidebar from './Sidebar'
import {Link} from 'react-router-dom'

class AdminItems extends React.Component {
  componentDidMount() {
    this.props.getItems()
  }

  render() {
    return (
      <div className="main">
        <aside>
          <Link className="filter" to="/admin/users">
            <h2>View All Users</h2>
          </Link>
          <Link
            to="/admin/items"
            className="filter"
            onClick={() => this.props.getItems()}
          >
            <h2>All Products</h2>
          </Link>
          <Link
            to="/admin/items"
            className="filter"
            onClick={() => this.props.getItems('skin')}
          >
            <h2>Skin Care</h2>
          </Link>
          <Link
            to="/admin/items"
            className="filter"
            onClick={() => this.props.getItems('hair')}
          >
            <h2>Hair Care</h2>
          </Link>
          <Link
            to="/admin/items"
            className="filter"
            onClick={() => this.props.getItems('cleaning')}
          >
            <h2>Cleaning Products</h2>
          </Link>
          <Link
            to="/admin/items"
            className="filter"
            onClick={() => this.props.getItems('candle')}
          >
            <h2>Candles</h2>
          </Link>
        </aside>
        <div>
          <h3 className="welcome">Admin Inventory</h3>

          <div className="all_product_container">
            {this.props.items.map(item => (
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
                    <button type="button" onClick={() => this.removeItem()}>
                      Remove
                    </button>
                    <button type="button" onClick={() => this.updateItem()}>
                      Update
                    </button>
                  </div>
                </div>
                <p>{item.description}</p>
              </div>
            ))}
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
    getItems: type => dispatch(fetchAllItems(type))
  }
}

export default connect(mapState, mapDispatch)(AdminItems)
