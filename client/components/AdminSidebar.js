import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllItems, fetchOutOfStock} from '../store/items'

const AdminSidebar = props => {
  return (
    <aside>
      <Link to="/account" className="filter">
        <h2> My Account</h2>
      </Link>
      <Link className="filter" to="/admin/users">
        <h2>View All Users</h2>
      </Link>
      <Link className="filter" to="/admin/update">
        <h2>Add New Item</h2>
      </Link>
      <Link
        to="/admin/items"
        className="filter"
        onClick={() => props.getItems()}
      >
        <h2>All Products</h2>
      </Link>
      {props.location === '/admin/items' ? (
        <div>
          <h2>Filter By Category:</h2>
          <Link
            to="/admin/items"
            className={props.filter === 'skin' ? 'filter_on' : 'filter'}
            onClick={() => props.getItems('skin')}
          >
            <h2>Skin Care</h2>
          </Link>
          <Link
            to="/admin/items"
            className={props.filter === 'hair' ? 'filter_on' : 'filter'}
            onClick={() => props.getItems('hair')}
          >
            <h2>Hair Care</h2>
          </Link>
          <Link
            to="/admin/items"
            className={props.filter === 'cleaning' ? 'filter_on' : 'filter'}
            onClick={() => props.getItems('cleaning')}
          >
            <h2>Cleaning Products</h2>
          </Link>
          <Link
            to="/admin/items"
            className={props.filter === 'skin' ? 'filter_on' : 'filter'}
            onClick={() => props.getItems('candle')}
          >
            <h2>Candles</h2>
          </Link>
          <Link
            to="/admin/items"
            className={props.filter === 'outOfStock' ? 'filter_on' : 'filter'}
            onClick={() => props.outOfStock()}
          >
            <h2>Out Of Stock</h2>
          </Link>
        </div>
      ) : (
        ''
      )}
    </aside>
  )
}

const mapState = state => {
  return {
    filter: state.filter
  }
}

const mapDispatch = dispatch => {
  return {
    getItems: type => dispatch(fetchAllItems(type)),
    outOfStock: () => dispatch(fetchOutOfStock())
  }
}

export default connect(mapState, mapDispatch)(AdminSidebar)
