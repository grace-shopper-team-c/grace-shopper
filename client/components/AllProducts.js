import React from 'react'
import {fetchAllProducts} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div>
        {this.props.products.map(product => (
          <Link key={product.id}>
            <div>
              <img src={product.Image} />
            </div>
            <div>
              <h3>{product.Title}</h3>
              <h3>{product.Price}</h3>
              <p>{product.Description}</p>
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchAllProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
