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
          <p className="error">Looks like you ain&#39;t got no whisky! Try updating your filters.</p>
        </div>
      )
    }

    return whiskies.map(whisky => {
      return (
        <div
          itemScope
          itemType="http://schema.org/Product"
          className="whisky"
          key={whisky.image_url}
          onClick={(event) => {
            if (!event.target.classList.contains('link')) this.props.openModal(whisky)
          }}>

          <img
            itemProp="image"
            className="image"
            src={`${process.env.PUBLIC_URL}/images/whiskies/thumbnails/${whisky.image_url}`}
            alt={`${whisky.brand} - ${whisky.name}`} />

          <div
            itemProp="name"
            className="title">
            <h2 className="brand">{whisky.brand}</h2>
            <p className="title-space">&nbsp;</p>
            <h3 className="name">{whisky.name}</h3>
          </div>

          <div className="details">
            <p
              itemScope
              itemType="http://schema.org/AggregateRating"
              itemProp="aggregateRating"
              className="rating">
              <span
                itemProp="ratingValue"
                content={whisky.average_rating}
                className="rating-value">
                <meta itemProp="bestRating" content="100" />
                <meta itemProp="ratingCount" content={whisky.ratings_count} />
                {whisky.average_rating}
                </span>
              <span className="rating-pct">%</span>
            </p>
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
              { (whisky.age === 0) ? <p className="attribute-value">NAS</p> : <p className="attribute-value">{whisky.age} years</p> }
            </div>
            <div className="attribute">
              <i className="attribute-key material-icons">monetization_on</i>
              <p
                itemScope
                itemType="http://schema.org/Offer"
                itemProp="offers"
                className="attribute-value">
                <span
                  itemProp="priceCurrency"
                  content="USD">
                  $
                </span>
                <span
                  itemProp="price">
                  {whisky.price}
                </span>
              </p>
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
