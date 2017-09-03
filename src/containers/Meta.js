import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScatterChart from '../components/ScatterChart'

class Meta extends Component {
  render() {
    if (!this.props.whiskies) {
      return (
        <div className="meta meta-hidden">
        </div>
      )
    }
    return (
      <div className="meta meta-visible">
        <ScatterChart
          id="meta"
          graphData={this.props.whiskies}
        />
      </div>
    )    
  }
}

function mapStateToProps(state) {
  return {
    whiskies: state.whiskies,
  }
}

export default connect(mapStateToProps, { })(Meta)
