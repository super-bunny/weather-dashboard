import React from 'react'
import './Dashboard.scss'
import CityWeather from '../../classes/CityWeather.ts'
import { Button } from '@blueprintjs/core'

export default class Dashboard extends React.Component {
  constructor (props)
  {
    super(props)
    this.setState({
      loading: false,
    })
    this.loading = false
    this.time = new Date()
  }

  componentDidMount ()
  {
    CityWeather.getInstance(this.props.city)
      .then(weather => {
        this.weatherData = weather
        this.setState({})
        this.refreshTimer = setInterval(() => {
          this.refreshData()
        }, 3600000)
      })
  }

  refreshData ()
  {
    this.time = new Date()
    this.loading = true
    this.setState({})
    this.weatherData.refresh()
      .finally(() => {
        this.loading = false
        this.setState({})
      })
  }

  content ()
  {
    return <div className="content">
      <div className="header">
        <h1 className="cityName">{this.weatherData.city}</h1>
        <div className="time">{this.time.getHours()}h{('0' + this.time.getMinutes()).slice(-2)}</div>
      </div>
      <div className="mainValues">
        <div>
          <div className="label">Temperature</div>
          <div className="temperature">{this.weatherData.temperature} C°</div>
        </div>
        <div>
          <div className="label">Humidity</div>
          <div className="humidity">{this.weatherData.humidity} %</div>
        </div>
      </div>
      <Button
        minimal={true}
        loading={this.loading}
        onClick={() => {this.refreshData()}}
        className="refreshButton"
      >Refresh</Button>
    </div>
  }

  render ()
  {
    let content
    if (this.weatherData) {
      content = this.content()
    } else {
      content = <p>Loading...</p>
    }
    return (<div className="Dashboard">
      {content}
    </div>)
  }
}
