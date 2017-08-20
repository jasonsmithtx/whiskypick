import React, { Component } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Whiskies from '../containers/Whiskies'
import Navigation from '../components/Navigation'
import Modal from '../containers/Modal'

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <Header />
        </div>
        <div className="app-navigation">
          <Navigation />
        </div>
        <div className="app-content">
          <Whiskies />
        </div>
        <div className="app-footer">
          <Footer />
        </div>
        <div className="app-modal">
          <Modal />
        </div>
      </div>
    )
  }
}
