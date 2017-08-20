import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchWhiskies, openModal } from '../actions/index'

class Whiskies extends Component {
  componentDidMount() {
    this.props.fetchWhiskies()
  }

  updateWhiskies() {
    let whiskies = [ ...this.props.whiskies ]

    // filtering
    whiskies = whiskies.filter(whisky => {
      return this.props.activeFilters.includes(whisky.type)
    })

    // profiling
    whiskies = whiskies.filter(whisky => {
      if (_.intersection(this.props.activeProfiles, whisky.profiles).length > 0) {
        return whisky
      }
      return null
    })

    // sorting
    if (this.props.activeSorter.direction === 'asc') {
      whiskies = _.sortBy(whiskies, this.props.activeSorter.sort)
    }
    else {
      whiskies = _.sortBy(whiskies, this.props.activeSorter.sort).reverse()
    }

    return whiskies
  }

  renderWhiskies(whiskies) {
    if (whiskies.length === 0) {
      return (
        <div className="no-whisky">
          <h2>Looks like you ain't got no whisky! :(</h2>
          <p>Try updating your filters.</p>
        </div>
      )
    }

    return whiskies.map(whisky => {
      return (
        <div
          className="whisky"
          key={whisky.image_url}
          onClick={(event) => {
            if (!event.target.classList.contains('link')) this.props.openModal(whisky)
          }}>

          <img
            className="image"
            src={`${process.env.PUBLIC_URL}/images/whiskies/thumbnails/${whisky.image_url}`}
            alt={`${whisky.brand} - ${whisky.name}`} />

          <div className="title">
            <h2 className="brand">{whisky.brand}</h2>
            <h3 className="name">{whisky.name}</h3>
          </div>

          <div className="details">
            <p className="rating">{whisky.average_rating}<span className="rating-pct">%</span></p>
            <a className="link" href={whisky.url} target="_blank" rel="noopener noreferrer">
              Visit Site <i className="material-icons">chevron_right</i>
            </a>
          </div>

          <div className="attributes">
            <div className="attribute">
              <i className="attribute-key material-icons">local_bar</i>
              <p className="attribute-value">{whisky.type}</p>
            </div>
            <div className="attribute">
              <i className="attribute-key material-icons">place</i>
              <p className="attribute-value">{whisky.origin}</p>
            </div>
            <div className="attribute">
              <i className="attribute-key material-icons">watch_later</i>
              <p className="attribute-value">{whisky.age} years</p>
            </div>
            <div className="attribute">
              <i className="attribute-key material-icons">monetization_on</i>
              <p className="attribute-value">${whisky.price}</p>
            </div>
          </div>

        </div>
      )
    })
  }

  render() {
    if (!this.props.whiskies) {
      return (
        <div className="content">
          <div className="loading">Loading...</div>
        </div>
      )
    }

    return (
      <div className="content">
        {this.renderWhiskies(this.updateWhiskies())}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeFilters: state.activeFilters,
    activeProfiles: state.activeProfiles,
    activeSorter: state.activeSorter,
    whiskies: state.whiskies,
  }
}

export default connect(mapStateToProps, { fetchWhiskies, openModal })(Whiskies)
