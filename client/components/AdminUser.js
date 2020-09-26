import React from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/admin'
import {Link} from 'react-router-dom'

class AdminUser extends React.Component {
  componentDidMount() {
    this.props.findUsers()
  }
  render() {
    return (
      <div className="main">
        <aside>
          <Link className="filter" to="/admin/items">
            <h2>View All Items</h2>
          </Link>
        </aside>
        <div>
          <h3 className="welcome">Admin Page - All Users</h3>
          <div className="main">
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
