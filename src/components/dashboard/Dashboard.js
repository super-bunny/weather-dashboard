import React from 'react'
import './Dashboard.scss'
import CityWeather from '../../classes/CityWeather.ts'
import { Button } from '@blueprintjs/core'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      time: new Date(),
      weatherData: null,
      refreshTimer: undefined,
    }
  }

  componentDidMount() {
    CityWeather.getInstance(this.props.city)
      .then(weather => {
        const refreshTimer = setInterval(() => {
          this.refreshData()
        }, 3600000)
        this.setState({
          weatherData: weather,
          refreshTimer,
        })
      })
  }

  refreshData() {
    this.setState({
      loading: true,
      time: new Date(),
    })
    this.state.weatherData.refresh()
      .finally(() => {
        this.setState({
          loading: false,
        })
      })
  }

  content() {
    return <div className="content">
      <div className="time">
        <small className="time-label">last update</small>
        <div>{('0' + this.state.time.getHours()).slice(-2)}h{('0' + this.state.time.getMinutes()).slice(-2)}</div>
      </div>
      <div className="header">
        <h1 className="cityName">{this.state.weatherData.city}</h1>
        <div className="country-code">{this.state.weatherData.countryCode}</div>
      </div>
      <div className="weather">
        <img
          className="image"
          src={this.state.weatherData.imgUrl}
          alt="weather"
        />
        <div className="description">{this.state.weatherData.description}</div>
      </div>
      <div className="mainValues">
        <div>
          <div className="label">Temperature</div>
          <div className="temperature">{this.state.weatherData.temperature} C°</div>
        </div>
        <div>
          <div className="label">Humidity</div>
          <div className="humidity">{this.state.weatherData.humidity} %</div>
        </div>
      </div>
      <Button
        minimal={true}
        loading={this.state.loading}
        onClick={() => {this.refreshData()}}
        className="refreshButton"
      >Refresh</Button>
    </div>
  }

  render() {
    let content
    if (this.state.weatherData) {
      content = this.content()
    } else {
      content = <p>Loading...</p>
    }
    return (<div className="Dashboard">
      {content}
    </div>)
  }
}
