import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="title"><Link to="/">WhiskyPick</Link></h1>
      </header>
    )
  }
}
