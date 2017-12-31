import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginMap, loginDispatcher } from '../redux/mappers'
import Ladda from 'ladda'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      registering: false,
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.laddaInstance = Ladda.create(this.registerBtn)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.selected : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.laddaInstance.start()

    setTimeout(() => {
      this.laddaInstance.stop()
    }, 2000)
  }

  render() {
    const { handleInputChange, handleSubmit } = this
    const { username, email, password, confirmPassword } = this.state

    return (
      <div className="middle-box text-center loginscreen   animated fadeInDown">
        <div>
          <div>
            <h1 className="logo-name">FS</h1>
          </div>
          <h3>Register to FantasyStocks</h3>
          <p>Create account to see it in action</p>
          <form className="m-t" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                name="username"
                value={username}
                onChange={handleInputChange}
                type="text"
                className="form-control"
                placeholder="Username"
                required=""
              />
            </div>
            <div className="form-group">
              <input
                name="email"
                value={email}
                onChange={handleInputChange}
                type="email"
                className="form-control"
                placeholder="Email"
                required=""
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                value={password}
                onChange={handleInputChange}
                type="password"
                className="form-control"
                placeholder="Password"
                required=""
              />
            </div>
            <div className="form-group">
              <input
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                type="password"
                className="form-control"
                placeholder="Confirm password"
                required=""
              />
            </div>
            <button
              ref={button => {
                this.registerBtn = button
              }}
              type="submit"
              className="ladda-button btn btn-primary block full-width m-b"
              data-style="slide-up"
            >
              Register
            </button>
            <p className="text-muted text-center">
              <small>Already have an account?</small>
            </p>
            <a className="btn btn-sm btn-white btn-block" href="/">
              Login
            </a>
          </form>
          <p className="m-t">
            <small>made by Annie, Qian, Barto &copy; 2018</small>
          </p>
        </div>
      </div>
    )
  }
}

export default connect(loginMap, loginDispatcher)(Login)
