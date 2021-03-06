import React, { Component } from 'react'
import Filters from '../containers/Filters'
import Profiles from '../containers/Profiles'
import Sorters from '../containers/Sorters'

export default class Navigation extends Component {
  constructor(props, context) {
    super (props, context)

    this.state = {
      navigationVisible: false
    }
  }

  handleKeyDown(event) {
    if (event.keyCode === 27) {
      this.setState({
        navigationVisible: !this.state.navigationVisible
      })
      window.scrollTo(0, 0)
    }
  }

  componentWillMount(){
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  render() {
    return (
      <div className={`navigation ${(this.state.navigationVisible) ? 'navigation-visible' : 'navigation-hidden'}`}>
        {(this.state.navigationVisible) ? (
          <i
            className="navigation-trigger material-icons"
            onClick={() => {
              this.setState({
                navigationVisible: !this.state.navigationVisible
              })
              window.scrollTo(0, 0)
            }}>
            close
          </i>
        ) : (
          <i
            className="navigation-trigger material-icons"
            onClick={() => {
              this.setState({
                navigationVisible: !this.state.navigationVisible
              })
            }}>
            menu
          </i>
        )}
        <div className="navigation-content">
          <div className="navigation-overlay" onClick={() => {
            this.setState({
              navigationVisible: !this.state.navigationVisible
            })
          }} />
          <Filters />
          <Profiles />
          <Sorters />
        </div>
      </div>
    )
  }
}
