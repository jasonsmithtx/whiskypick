import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Whiskies from '../containers/Whiskies'
import Navigation from '../components/Navigation'
import Modal from '../containers/Modal'
import User from '../containers/User'

export default class App extends Component {
  render() {
    return (
      <Router>
          <div className="app">
            <div className="app-header">
              <Header />
            </div>

            <Route path="/" exact={true} render={() => (
              <div className="app-view app-view-home">
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

            <Route path="/user/:userId" exact={true} render={({ match }) => (
              <div className="app-view app-view-user">
                <div className="app-content">
                  <User userId={match.params.userId} />
                </div>
                <div className="app-modal">
                  <Modal />
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
