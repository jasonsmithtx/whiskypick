import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSorters, updateActiveSorter } from '../actions/index'

class Sorters extends Component {
  constructor(props, context) {
    super (props, context)

    this.state = {
      sorterListVisible: false
    }
  }

  componentDidMount() {
    this.props.fetchSorters()
  }

  renderSorters() {
    return this.props.sorters.map(sorter => {
      if (sorter.title === this.props.activeSorter.title) {
        return (
          <p
            className="navigation-sorter sorter active"
            key={sorter.title}>
            <i className="material-icons">check_box</i>
            {sorter.title}
          </p>
        )
      }

      return (
        <p
          className="navigation-sorter sorter inactive"
          key={sorter.title}
          onClick={() => {
            this.props.updateActiveSorter(sorter)
            window.scrollTo(0, 0)
          }}>
          <i className="material-icons hidden">check_box</i>
          {sorter.title}
        </p>
      )
    })
  }

  render() {
    return (
      <div
        className={`navigation-sorters-list sorters ${(this.state.sorterListVisible) ?
        'navigation-sorters-list-visible' : 'navigation-sorters-list-hidden'}`}>
        {(this.props.sorters) ? (
          <div className="navigation-sorters-list-column">
            <h3 className="title">Sorted By</h3>
            {(this.state.sorterListVisible) ? (
              <i
                className="navigation-sorters-trigger material-icons"
                onClick={() => {
                  this.setState({
                    sorterListVisible: !this.state.sorterListVisible
                  })
                }}>
                cancel
              </i>
            ) : (
              <i
                className="navigation-sorters-trigger material-icons"
                onClick={() => {
                  this.setState({
                    sorterListVisible: !this.state.sorterListVisible
                  })
                }}>
                arrow_drop_down_circle
              </i>
            )}
            <div className="navigation-sorters">
              {this.renderSorters()}
            </div>
          </div>
        ) : (
          <p>Loading sorting options...</p>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sorters: state.sorters,
    activeSorter: state.activeSorter,
  }
}

export default connect(mapStateToProps, { fetchSorters, updateActiveSorter })(Sorters)
