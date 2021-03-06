import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModal } from '../actions/index'
import BarChart from '../components/BarChart'

class Modal extends Component {
  handleKeyDown(event) {
    if (event.keyCode === 27) this.props.closeModal()
  }

  componentWillMount(){
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
  }

  render() {
    if (!this.props.modalVisible) {
      return (
        <div className="modal modal-hidden">
        </div>
      )
    }

    const whisky = this.props.activeWhisky

    return (
      <div
        className="modal modal-visible">
        <div
          className="modal-overlay"
          onClick={(event) => {
            if (event.target.classList.contains('modal-overlay')) this.props.closeModal()
          }}>

          <div className="modal-dialog">
            <img
              className="image"
              src={`${process.env.PUBLIC_URL}/images/whiskies/${whisky.image_url}`}
              alt={`${whisky.brand} - ${whisky.name}`} />

            <div className="modal-header">
              <i
                className="modal-close-trigger material-icons"
                onClick={() => {
                  this.props.closeModal()
                }}>
                close
              </i>
              <div className="title">
                <h2 className="brand">{whisky.brand}</h2>
                <h3 className="name">{whisky.name}</h3>
                <p className="description">{whisky.description}</p>
              </div>
            </div>

            <div className="modal-content">
              <BarChart
                id="modal"
                ratings={whisky.ratings}
              />
            </div>

            <div className="modal-footer">
              <p className="rating">{whisky.average_rating}<span className="rating-pct">%</span></p>
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

          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    whiskies: state.whiskies,
    activeWhisky: state.activeWhisky,
    modalVisible: state.modalVisible,
  }
}

export default connect(mapStateToProps, { closeModal })(Modal)
