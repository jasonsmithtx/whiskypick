import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        {
        // <img
        //   className="image"
        //   src={`${process.env.PUBLIC_URL}/images/logo.png`}
        //   alt="WhiskyPick" />
        }
        <h1 className="title">WhiskyPick</h1>
      </header>
    )
  }
}
