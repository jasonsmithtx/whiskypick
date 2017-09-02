import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Whiskies from '../containers/Whiskies'
import Navigation from '../components/Navigation'
import Modal from '../containers/Modal'
import Users from '../containers/Users'

export default class App extends Component {
  render() {
    return (
      <Router>
          <div className="app">
            <div className="app-header">
              <Header />
            </div>
            <Route path="/" exact={true} render={() => (
              <div className="app-view-home">
                <div className="app-navigation">
                  <Navigation />
                </div>
                <div className="app-content">
                  <Whiskies />
                </div>
                <div className="app-modal">
                  <Modal />
                </div>
              </div>
            )}/>
            <Route path="/users" exact={true} render={() => (
              <div className="app-view-users">
                <div className="app-users">
                  <Users />
                </div>
              </div>
            )}/>
            <div className="app-footer">
              <Footer />
            </div>
          </div>
      </Router>
    )
  }
}
