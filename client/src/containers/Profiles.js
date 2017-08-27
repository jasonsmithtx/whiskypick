import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProfiles, updateActiveProfiles } from '../actions/index'
import CheckBoxes from '../components/CheckBoxes'

class Profiles extends Component {
  componentDidMount() {
    this.props.fetchProfiles()
  }

  render() {
    if (!this.props.profiles) {
      return (
        <div className="navigation-list profiles">
          <p>Loading taste profiles...</p>
        </div>
      )
    }

    return (
      <CheckBoxes
        title="Taste Profiles"
        id="profiles"
        elements={this.props.profiles}
        activeElements={this.props.activeProfiles}
        onClick={(profile) => this.props.updateActiveProfiles(profile)}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    profiles: state.profiles,
    activeProfiles: state.activeProfiles,
  }
}

export default connect(mapStateToProps, { fetchProfiles, updateActiveProfiles })(Profiles)
