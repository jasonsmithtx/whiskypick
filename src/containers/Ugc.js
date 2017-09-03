import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUgc } from '../actions/index'

class Ugc extends Component {
  componentDidMount() {
    this.props.fetchUgc()
  }

  renderUgc() {
    return this.props.ugc.map(item => {
      return (
        <a
          className="ugc-item"
          key={item.id}
          style={{ backgroundImage: `url(${item.images.low_resolution.url})` }}
          target="_blank"
          rel="noopener noreferrer"
          href={item.link}>
          <h2 className="user">@{item.user.username}</h2>
        </a>
      )
    })
  }

  render() {
    if (!this.props.ugc) {
      return (
        <div className="ugc">
          <div className="loading">Loading...</div>
        </div>
      )
    }

    return (
      <div className="ugc">
        {this.renderUgc()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ugc: state.ugc,
  }
}

export default connect(mapStateToProps, { fetchUgc })(Ugc)
