import React from 'react'
import './Home.css'

export default class Home extends React.Component {
  render ()
  {
    return (<div className="Home">
      <h1 className="title">WEATHER</h1>
      <p>Get city weather thanks to <a href="https://openweathermap.org">OpenWeather API</a></p>
      <div class="searchBar bp3-input-group bp3-large">
        <span class="bp3-icon bp3-icon-search bp3-large"/>
        <input
          class="bp3-input"
          type="search"
          placeholder="City"
          dir="auto"
        />
      </div>
    </div>)
  }
}
