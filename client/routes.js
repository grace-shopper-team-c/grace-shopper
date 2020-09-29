import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  SingleItem,
  AdminUser,
  AdminItems
} from './components'
import Checkout from './components/Checkout'
import Cart from './components/Cart'
import HomePage from './components/HomePage'
import Confirmation from './components/Confirmation'
import {me} from './store'
import AdminNewItem from './components/AdminNewItem'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Route exact path="/" component={HomePage} />
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/account" component={UserHome} />
            <Route exact path="/item/:itemId" component={SingleItem} />
            {/* Routes only available to uses with admin rights */}
            {isAdmin && <Route path="/admin/users" component={AdminUser} />}
            {isAdmin && <Route path="/admin/items" component={AdminItems} />}
            {isAdmin && <Route path="/admin/update" component={AdminNewItem} />}
          </Switch>
        )}
        <Route exact path="/item/:itemId" component={SingleItem} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
