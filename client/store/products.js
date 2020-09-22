import axios from 'axios'

const initialProducts = []

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

const getAllProducts = products => {
  return {
    type: getAllProducts,
    products: products
  }
}

export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/products')
      const products = response.data
      dispatch(getAllProducts(products))
    } catch (error) {
      console.error(error.message)
    }
  }
}

const productsReducer = (products = initialProducts, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return products
  }
}

export default productsReducer
