import React from 'react'

export const Login = ({ login }) => (
  <form onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  }}>
    <div className="form-child">
      <h4>Name</h4>
      <input className="form-style" name="username" />
    </div>
    <div className="form-child">
      <h4>Password</h4>
      <input className="form-style" name="password" type="password" />
    </div>
    <input style={{marginTop: '10px'}} type="submit" value="Login" />
  </form>
)

import { login } from '../reducers/auth'
import { connect } from 'react-redux'

export default connect(
  state => ({}),
  { login },
)(Login)
