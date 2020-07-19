import React from 'react'
import './Home.css'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
    this.onChange = this.onChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Enter' && this.state.inputValue.length > 0) {
        this.submit()
      }
    })
  }

  onChange(event) {
    this.setState({
      inputValue: event.target.value,
    })
  }

  submit() {
    this.props.onSubmit(this.state.inputValue)
  }

  render() {
    return (<div className="Home">
      <h1 className="title">WEATHER</h1>
      <p>Get city weather thanks to <a href="https://openweathermap.org">OpenWeather API</a></p>
      <div className="searchBar bp3-input-group bp3-large">
        <span className="bp3-icon bp3-icon-search bp3-large"/>
        <input
          className="bp3-input"
          type="search"
          placeholder="City"
          dir="auto"
          autoFocus
          value={this.state.inputValue}
          onChange={this.onChange}
        />
        <button
          className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"
          onClick={this.submit}
        />
      </div>
    </div>)
  }
}

export default Home
