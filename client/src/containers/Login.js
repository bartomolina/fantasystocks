import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginMap, loginDispatcher } from '../redux/mappers'
import Ladda from 'ladda'
import LoginForm from '../components/LoginForm'

class Login extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { user, getUser } = this.props

    if (!user.id) {
      getUser()
    }

    this.laddaInstance = Ladda.create(this.loginBtn)
  }

  handleSubmit(values) {
    const { history } = this.props

    console.log(values)
    this.laddaInstance.start()
    setTimeout(() => {
      this.laddaInstance.stop()
    }, 2000)

    history.push('/home')
  }

  render() {
    const { handleSubmit } = this

    return (
      <div className="middle-box text-center loginscreen animated fadeInDown">
        <div>
          <div>
            <h1 className="logo-name">FS</h1>
          </div>
          <h3>Welcome to FantasyStocks (User ID: {this.props.user.id})</h3>
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
          <LoginForm
            onSubmit={handleSubmit}
            loginBtn={el => (this.loginBtn = el)}
          />
          <p className="m-t">
            <small>made by Annie, Qian, Barto &copy; 2018</small>
          </p>
        </div>
      </div>
    )
  }
}

export default connect(loginMap, loginDispatcher)(Login)
