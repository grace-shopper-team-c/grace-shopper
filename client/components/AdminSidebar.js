import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllItems} from '../store/items'

const AdminSidebar = props => {
  return (
    <aside>
      <Link to="/account" className="filter">
        <h2>Personal Account</h2>
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
      <Link
        to="/admin/items"
        className="filter"
        onClick={() => props.getItems('skin')}
      >
        <h2>Skin Care</h2>
      </Link>
      <Link
        to="/admin/items"
        className="filter"
        onClick={() => props.getItems('hair')}
      >
        <h2>Hair Care</h2>
      </Link>
      <Link
        to="/admin/items"
        className="filter"
        onClick={() => props.getItems('cleaning')}
      >
        <h2>Cleaning Products</h2>
      </Link>
      <Link
        to="/admin/items"
        className="filter"
        onClick={() => props.getItems('candle')}
      >
        <h2>Candles</h2>
      </Link>
    </aside>
  )
}

const mapDispatch = dispatch => {
  return {
    getItems: type => dispatch(fetchAllItems(type))
  }
}

export default connect(null, mapDispatch)(AdminSidebar)
