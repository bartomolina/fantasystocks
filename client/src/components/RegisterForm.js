import React from 'react'
import { Field, reduxForm } from 'redux-form'

let RegisterForm = props => {
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
          name="email"
          component="input"
          type="email"
          className="form-control"
          placeholder="Email"
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
      <div className="form-group">
        <Field
          name="confirmPassword"
          component="input"
          type="password"
          className="form-control"
          placeholder="Confirm password"
        />
      </div>
      <button
        ref={props.registerBtn}
        disabled={pristine || submitting}
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
  )
}

RegisterForm = reduxForm({
  form: 'register',
  fields: ['username', 'email', 'password', 'confirmPassword']
})(RegisterForm)

export default RegisterForm
