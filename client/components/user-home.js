import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateUser} from '../store/user'
import AdminSidebar from './AdminSidebar'
import UpdateForm from './UpdateForm'

/**
 * COMPONENT
 */
//Account information page.
//Show user infomation about their account and allows them to update thier address
//Grants Admins access to their admin only routes
export const UserHome = props => {
  const {email, isAdmin} = props

  return (
    <div className="all_product_container">
      {isAdmin ? <AdminSidebar /> : ''}
      <div>
        <h3 className="welcome">Welcome, {email}</h3>
        <UpdateForm updateAddress={props.handleSubmit} />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    id: state.user.id,
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, id) {
      evt.preventDefault()
      const address = evt.target.address.value
      const city = evt.target.city.value
      const state = evt.target.state.value
      const zip = evt.target.zip.value
      dispatch(updateUser(id, {address, city, state, zip}))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */

UserHome.propTypes = {
  email: PropTypes.string
}
