import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions/index'

class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    if (!this.props.users) {
      return (
        <div className="users">
          <div className="loading">Loading...</div>
        </div>
      )
    }

    return (
      <div className="users">
        <Link to="/">
          <p className="title">Back</p>
        </Link>
        <h1 className="title">Select a user:</h1>
        {this.props.users.map(user => {
          const userId = user.trim().replace(/[^-A-Za-z0-9]+/g, '-').toLowerCase()

          return (
            <div className="user" key={user}>
              <Link to={`/users/${userId}`}>
                <p className="title">{user}</p>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    ugc: state.ugc,
  }
}

export default connect(mapStateToProps, { fetchUsers })(Users)
