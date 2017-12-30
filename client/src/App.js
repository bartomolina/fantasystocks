import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Login from './containers/Login'
import Register from './containers/Register'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    )
  }
}

export default App
