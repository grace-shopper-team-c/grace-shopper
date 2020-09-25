import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/admin'

class AdminUser extends React.Component {
  componentDidMount() {
    this.props.findUsers()
  }
  render() {
    return (
      <div>
        <h1>Admin Page - All Users</h1>
        <div>
          {this.props.allUsers ? (
            this.props.allUsers.map(user => {
              return (
                <div key={user.email}>
                  <p>{user.email}</p>
                  <p>
                    {user.city}, {user.state}
                  </p>
                </div>
              )
            })
          ) : (
            <div>No users found</div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allUsers: state.admin.allUsers
  }
}

const mapDispatch = dispatch => {
  return {
    findUsers: () => dispatch(fetchAllUsers())
  }
}

export default connect(mapState, mapDispatch)(AdminUser)
