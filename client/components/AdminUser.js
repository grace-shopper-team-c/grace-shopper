import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/admin'
import AdminSidebar from './AdminSidebar'

class AdminUser extends React.Component {
  componentDidMount() {
    this.props.findUsers()
  }
  render() {
    return (
      <div className="main">
        <AdminSidebar />
        <div className="all_product_container">
          <h3 className="welcome">Admin Page - All Users</h3>
          <div className="all_product_container">
            {this.props.allUsers ? (
              this.props.allUsers.map(user => {
                return (
                  <div key={user.email}>
                    <p>{user.email}</p>
                    <p>
                      {user.city !== '' ? `${user.city}, ${user.state}` : ''}
                    </p>
                  </div>
                )
              })
            ) : (
              <div>No users found</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allUsers: state.admin
  }
}

const mapDispatch = dispatch => {
  return {
    findUsers: () => dispatch(fetchAllUsers())
  }
}

export default connect(mapState, mapDispatch)(AdminUser)
