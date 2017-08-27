import React, { Component } from 'react'
import { Bar, defaults } from 'react-chartjs-2'

export default class Chart extends Component {
  render () {
    const { id, ratings } = this.props

    defaults.global = {
      ...defaults.global,
      defaultFontFamily: '"Roboto", Helvetica, Arial, sans-serif',
    }

    const labels = ratings.map(rating => `${rating.name.split(' ')[0]} ${rating.name.split(' ')[1][0]}.`)
    const data = ratings.map(rating => rating.score)

    const chartConfig = {
      data: {
        labels,
        datasets: [
          {
            backgroundColor: 'rgba(255,190,0,0.7)',
            hoverBackgroundColor: 'rgba(237,174,0,0.7)',
            borderWidth: 0,
            data,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 100
            }
          }]
        },
        legend: {
          display: false
        },
        title: {
          display: false
        }
      }
    }

    return (
      <div className={`${id}-chart chart`}>
        <Bar
          data={chartConfig.data}
          options={chartConfig.options}
          height={250}
        />
      </div>
    )
  }
}
