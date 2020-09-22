import React from 'react'
import {fetchAllItems} from '../store/Items'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllItems extends React.Component {
  componentDidMount() {
    this.props.getItems()
  }

  render() {
    return (
      <div>
        {this.props.Items.map(item => (
          <Link to={`/products/${item.id}`} key={item.id}>
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
    Items: state.Items
  }
}

const mapDispatch = dispatch => {
  return {
    getItems: () => dispatch(fetchAllItems())
  }
}

export default connect(mapState, mapDispatch)(AllItems)
