import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginMap, loginDispatcher } from '../redux/mappers'
import Ladda from 'ladda'
import RegisterForm from '../components/RegisterForm'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      registering: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.laddaInstance = Ladda.create(this.registerBtn)
  }

  handleSubmit(values) {
    console.log(values)

    this.laddaInstance.start()

    setTimeout(() => {
      this.laddaInstance.stop()
    }, 2000)
  }

  render() {
    const { handleSubmit } = this

    return (
      <div className="middle-box text-center loginscreen animated fadeInDown">
        <div>
          <div>
            <h1 className="logo-name">FS</h1>
          </div>
          <h3>Register to FantasyStocks</h3>
          <p>Create account to see it in action</p>
          <RegisterForm
            onSubmit={handleSubmit}
            registerBtn={el => (this.registerBtn = el)}
          />
          <p className="m-t">
            <small>made by Annie, Qian, Barto &copy; 2018</small>
          </p>
        </div>
      </div>
    )
  }
}

export default connect(loginMap, loginDispatcher)(Register)
