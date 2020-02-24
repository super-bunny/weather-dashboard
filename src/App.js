import React from 'react'
import './App.css'
import Home from './components/Home/Home'
import Dashboard from './components/dashboard/Dashboard'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: undefined,
    }
    this.searchCity = this.searchCity.bind(this)
  }

  searchCity(value) {
    this.setState({
      search: value,
    })
  }

  render() {
    let Body
    if (!this.state.search) {
      Body = <Home onSubmit={this.searchCity}/>
    } else {
      Body = <Dashboard city={this.state.search}/>
    }
    return (<div className="App">
      {Body}
    </div>)
  }
}
