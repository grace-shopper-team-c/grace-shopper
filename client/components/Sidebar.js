import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllItems} from '../store/items'

const Sidebar = props => {
  return (
    <aside>
      <Link to="/" style={{color: 'white'}} onClick={() => props.getItems()}>
        <h2>All Products</h2>
      </Link>
      <Link to="/" onClick={() => props.getItems('skin')}>
        <h2>Skin Care</h2>
      </Link>
      <Link to="/" onClick={() => props.getItems('hair')}>
        <h2>Hair Care</h2>
      </Link>
      <Link to="/" onClick={() => props.getItems('cleaning')}>
        <h2>Cleaning Products</h2>
      </Link>
      <Link to="/" onClick={() => props.getItems('candle')}>
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

export default connect(null, mapDispatch)(Sidebar)
