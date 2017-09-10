import React, { Component } from 'react'
import { Scatter, defaults } from 'react-chartjs-2'

export default class ScatterChart extends Component {
  render () {
    const { id, graphData } = this.props

    defaults.global = {
      ...defaults.global,
      defaultFontFamily: '"Roboto", Helvetica, Arial, sans-serif',
    }

    const data = graphData.map(d => {
      return {
        x: d.average_rating,
        y: d.price
      }
    })

    const chartConfig = {
      data: {
        datasets: [{
          backgroundColor: 'rgba(255,190,0,0.7)',
          hoverBackgroundColor: 'rgba(237,174,0,0.7)',
          borderWidth: 0,
          fill: false,
          showLine: false,          
          data,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }],
          xAxes: [{
            ticks: {
              min: 0,
              max: 100
            }
          }]
        },
        title: {
          display: false
        },
        tooltips: {
          cornerRadius: 2,
          displayColors: false,
          titleFontSize: 14,
          xPadding: 10,
          yPadding: 10,
          callbacks: {
            title: (tooltipItem, data) => {
              return `${graphData[tooltipItem[0].index].brand} - ${graphData[tooltipItem[0].index].name}: ${tooltipItem[0].xLabel}%`
            },
            label: (tooltipItem, data) => {
              return false
            }
          }
        }
      }
    }

    return (
      <div className={`${id}-chart chart`}>
        <Scatter
          data={chartConfig.data}
          options={chartConfig.options}
          height={500}
        />
      </div>
    )
  }
}
