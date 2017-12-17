import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  constructor(props, context) {
    super (props, context)

    this.state = {
      makeHeaderSticky: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(event) {
    const supportPageOffset = window.pageXOffset !== undefined
    const distanceFromTop = supportPageOffset ? window.pageYOffset : document.documentElement.scrollTop

    if (this.state.makeHeaderSticky === false && distanceFromTop >= 100) {
      this.setState({
        makeHeaderSticky: !this.state.makeHeaderSticky
      })
    }

    if (this.state.makeHeaderSticky === true && distanceFromTop < 100) {
      this.setState({
        makeHeaderSticky: !this.state.makeHeaderSticky
      })
    }
  }

  render() {
    return (
      <header className={`${this.state.makeHeaderSticky ? 'sticky header' : 'header'}`}>
        <h1 className="title"><Link to="/">WhiskyPick</Link></h1>
      </header>
    )
  }
}
