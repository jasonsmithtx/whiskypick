import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchFilters, updateActiveFilters } from '../actions/index'
import CheckBoxes from '../components/CheckBoxes'

class Filters extends Component {
  componentDidMount() {
    this.props.fetchFilters()
  }

  render() {
    if (!this.props.filters) {
      return (
        <div className="navigation-list filters">
          <p>Loading whisky types...</p>
        </div>
      )
    }

    return (
      <CheckBoxes
        title="Whisky Types"
        id="filters"
        elements={this.props.filters}
        activeElements={this.props.activeFilters}
        onClick={(filter) => this.props.updateActiveFilters(filter)}
      />
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
