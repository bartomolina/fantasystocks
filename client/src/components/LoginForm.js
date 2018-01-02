import React from 'react'
import { Field, reduxForm } from 'redux-form'

let LoginForm = props => {
  const { handleSubmit, pristine, submitting } = props

  return (
    <form className="m-t" onSubmit={handleSubmit}>
      <div className="form-group">
        <Field
          name="username"
          component="input"
          type="text"
          className="form-control"
          placeholder="Username"
        />
      </div>
      <div className="form-group">
        <Field
          name="password"
          component="input"
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>
      <button
        ref={props.loginBtn}
        disabled={pristine || submitting}
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
      <a className="btn btn-sm btn-white btn-block" href="/register">
        Create an account
      </a>
    </form>
  )
}

LoginForm = reduxForm({
  form: 'login',
  fields: ['username', 'password']
})(LoginForm)

export default LoginForm
