import React, { Component } from 'react'

export default class CheckBoxes extends Component {
  render () {
    const { title, elements, activeElements, onClick } = this.props

    return (
      <div className="navigation-list-column">
        <h3 className="title">{title}</h3>
        {elements.map(element => {
          if (activeElements.includes(element)) {
            return (
              <p
                className="navigation-list-item active"
                key={element}
                onClick={() => onClick(element)}>
                <i className="material-icons">check_box</i>
                {element}
              </p>
            )
          }
          return (
            <p
              className="navigation-list-item inactive"
              key={element}
              onClick={() => onClick(element)}>
              <i className="material-icons">check_box_outline_blank</i>
              {element}
            </p>
          )
        })}
      </div>
    )
  }
}
