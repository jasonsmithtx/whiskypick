import React, { Component } from 'react'
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
      {this.props.users.map(user => (
        <div className="user" key={user}>
          <h1 className="title">{user}</h1>
        </div>
      ))}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
  }
}

export default connect(mapStateToProps, { fetchUsers })(Users)
