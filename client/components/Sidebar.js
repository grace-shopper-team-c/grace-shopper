import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllItems} from '../store/items'

const Sidebar = props => {
  return (
    <aside>
      <Link
        to="/"
        className={props.filter === '' ? 'filter_on' : 'filter'}
        onClick={() => props.getItems()}
      >
        <h2>All Products</h2>
      </Link>
      <h2>Filter By Category:</h2>
      <Link
        to="/"
        className={props.filter === 'skin' ? 'filter_on' : 'filter'}
        onClick={() => props.getItems('skin')}
      >
        <h2>Skin Care</h2>
      </Link>
      <Link
        to="/"
        className={props.filter === 'hair' ? 'filter_on' : 'filter'}
        onClick={() => props.getItems('hair')}
      >
        <h2>Hair Care</h2>
      </Link>
      <Link
        to="/"
        className={props.filter === 'cleaning' ? 'filter_on' : 'filter'}
        onClick={() => props.getItems('cleaning')}
      >
        <h2>Cleaning Products</h2>
      </Link>
      <Link
        to="/"
        className={props.filter === 'candle' ? 'filter_on' : 'filter'}
        onClick={() => props.getItems('candle')}
      >
        <h2>Candles</h2>
      </Link>
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
    getItems: type => dispatch(fetchAllItems(type))
  }
}

export default connect(mapState, mapDispatch)(Sidebar)
