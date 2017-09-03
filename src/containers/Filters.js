import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFilters, updateActiveFilters } from '../actions/index'
import CheckBoxes from '../components/CheckBoxes'

class Filters extends Component {
  componentDidMount() {
    this.props.fetchFilters()
  }

  render() {
    return (
      <div className="navigation-list filters">
        {(this.props.filters) ? (
          <CheckBoxes
            title="Whisky Types"
            elements={this.props.filters}
            activeElements={this.props.activeFilters}
            onClick={(filter) => this.props.updateActiveFilters(filter)}
          />
        ) : (
          <p>Loading whisky types...</p>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filters,
    activeFilters: state.activeFilters,
  }
}

export default connect(mapStateToProps, { fetchFilters, updateActiveFilters })(Filters)
