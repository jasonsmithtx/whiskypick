import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProfiles, updateActiveProfiles } from '../actions/index'
import CheckBoxes from '../components/CheckBoxes'

class Profiles extends Component {
  componentDidMount() {
    this.props.fetchProfiles()
  }

  render() {
    return (
      <div className="navigation-list profiles">
        {(this.props.profiles) ? (
          <CheckBoxes
            title="Taste Profiles"
            elements={this.props.profiles}
            activeElements={this.props.activeProfiles}
            onClick={(profile) => this.props.updateActiveProfiles(profile)}
          />
        ) : (
          <p>Loading taste profiles...</p>
        )}
      </div>
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
