import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchWhiskies, openModal } from '../actions/index'

class User extends Component {
  componentDidMount() {
    this.props.fetchWhiskies()
  }

  getFavorites(whiskys) {
    const users = []
    const favoritesLimit = 100

    whiskys.forEach(whisky => {
      whisky.ratings.forEach(user => {
        users.push({
          name: user.name,
          rating: user.score,
          whisky
        })
      })
    })

    const groupedUsers = _.groupBy(users, 'name')
    const names = _.keys(groupedUsers).sort()

    const favorites = names.map(name => {
      return {
        name: name.toUpperCase(),
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
    return userFavorites.map((userFavorite, index) => {
      const whisky = userFavorite.whisky
      return (
        <div
          className="user-favorite"
          key={whisky.image_url}
          onClick={() => {
            this.props.openModal(whisky)
          }}>

          <p className="rank">{index + 1}.</p>
          <img
            className="image"
            src={`${process.env.PUBLIC_URL}/images/whiskies/${whisky.image_url}`}
            alt={`${whisky.brand} - ${whisky.name}`} />
          <div className="title">
            <h2 className="brand">{whisky.brand}</h2>
            <h3 className="name">{whisky.name}</h3>
          </div>
          <p className="rating">{userFavorite.rating}<span className="rating-pct">%</span></p>
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
    const userName = this.props.userId.replace(/-/g, ' ').toUpperCase()
    const userFavorites = favorites.find(favorite => favorite.name === userName)

    return (
      <div className="user">
        <div className="user-mobile-close-button">
          <Link to="/">
            <i className="material-icons">close</i>
          </Link>
        </div>
        <h1 className="user-title">Favorite whiskys for <span>{userName}</span></h1>
        <div className="user-favorites">
          {this.renderUserFavorites(userFavorites.ratings)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    whiskies: state.whiskies,
  }
}

export default connect(mapStateToProps, { fetchWhiskies, openModal })(User)
