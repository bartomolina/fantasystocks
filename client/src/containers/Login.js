import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginMap, loginDispatcher } from '../redux/mappers'

class Login extends Component {
  componentDidMount() {
    if (!this.props.user.id) {
      this.props.getUser()
    }
  }

  render() {
    return (
      <div className="middle-box text-center loginscreen animated fadeInDown">
        <div>
          <div>
            <h1 className="logo-name">FS</h1>
          </div>
          <h3>Welcome to FantasyStocks (User ID: {this.props.user.id})</h3>
          <p>Where fantasy league meets the stock market</p>
          <p>Join us!</p>
          <a
            href="/api/auth/google"
            className="btn btn-block btn-social btn-google"
          >
            <span className="fa fa-google" /> Sign in with Google
          </a>
          <a
            href="/api/auth/facebook"
            className="btn btn-block btn-social btn-facebook"
          >
            <span className="fa fa-facebook" /> Sign in with Facebook
          </a>
          <form className="m-t" action="index.html">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Username"
                required=""
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required=""
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary block full-width m-b"
            >
              Login
            </button>
            <a href="/">
              <small>Forgot password?</small>
            </a>
            <p className="text-muted text-center">
              <small>Do not have an account?</small>
            </p>
            <a className="btn btn-sm btn-white btn-block" href="register.html">
              Create an account
            </a>
          </form>
          <p className="m-t">
            {' '}
            <small>made by Annie, Qian, Barto &copy; 2018</small>{' '}
          </p>
        </div>
      </div>
    )
  }
}

export default connect(loginMap, loginDispatcher)(Login)
