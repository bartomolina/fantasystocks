import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap-social/bootstrap-social.css'
import './css/inspinia.css'
import Login from './containers/Login'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Login />, document.getElementById('root'))
registerServiceWorker()
