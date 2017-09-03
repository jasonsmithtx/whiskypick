import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchWhiskies } from '../actions/index'

class User extends Component {
  componentDidMount() {
    this.props.fetchWhiskies()
  }

  getFavorites(whiskeys) {
    const users = []
    const favoritesLimit = 10

    whiskeys.forEach(whiskey => {
      whiskey.ratings.forEach(user => {
        users.push({
          name: user.name,
          rating: user.score,
          whiskey
        })
      })
    })

    const groupedUsers = _.groupBy(users, 'name')
    const names = _.keys(groupedUsers).sort()

    const favorites = names.map(name => {
      return {
        name,
        ratings: groupedUsers[name]
      }
    })

    favorites.forEach(favorite => {
      favorite.ratings = _.sortBy(favorite.ratings, 'rating').reverse()
      favorite.ratings = favorite.ratings.slice(0, favoritesLimit)
    })

    return favorites
  }

  renderUserFavorites(userFavorites) {
    return userFavorites.map(userFavorite => {
      const whisky = userFavorite.whiskey
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
            <p className="rating">{userFavorite.rating}<span className="rating-pct">%</span></p>
          </div>
        </div>
      )
    })
  }

  render() {
    if (!this.props.whiskies) {
      return (
        <div className="user">
          <div className="loading">Loading...</div>
        </div>
      )
    }

    const favorites = this.getFavorites(this.props.whiskies)
    const userName = this.props.userId.replace(/-/g, ' ').replace(/(^|\s)[a-z]/g, f => f.toUpperCase())
    const userFavorites = favorites.find(favorite => favorite.name === userName)

    return (
      <div className="user">
        <Link to="/users">
          <p className="title">Back</p>
        </Link>
        <h1 className="title">{userName}</h1>
        {this.renderUserFavorites(userFavorites.ratings)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    whiskies: state.whiskies,
  }
}

export default connect(mapStateToProps, { fetchWhiskies })(User)
