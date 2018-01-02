import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from './common/PrivateRoute'
import Login from './containers/Login'
import Register from './containers/Register'
import Home from './containers/Home'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/home" component={Home} />
      </div>
    )
  }
}

export default App
