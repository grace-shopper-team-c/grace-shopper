import React from 'react'
import {fetchAllItems} from '../store/items'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllItems extends React.Component {
  componentDidMount() {
    this.props.getItems()
  }

  render() {
    return (
      <div>
        {this.props.items.map(item => (
          <Link to={`/${item.id}`} key={item.id}>
            <div>
              <img src={item.image} />
            </div>
            <div>
              <h3>{item.name}</h3>
              <h3>{item.price}</h3>
              <p>{item.description}</p>
            </div>
          </Link>
        ))}
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
    getItems: () => dispatch(fetchAllItems())
  }
}

export default connect(mapState, mapDispatch)(AllItems)