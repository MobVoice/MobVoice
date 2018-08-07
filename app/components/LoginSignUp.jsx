import React from 'react'
import { Link } from 'react-router-dom'
import store from '../store'
import Login from './Login'
import WhoAmI from './WhoAmI'
import axios from 'axios'

class LoginSignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state={value: '', error: ''}
    this.onSignupSubmit = this.onSignupSubmit.bind(this)
    this.onChange=this.onChange.bind(this)
  }

  onChange(event) {
    this.setState({value: event.target.value})
  }

  onSignupSubmit(evt) {
    evt.preventDefault()
    if (!this.is50Char(evt.target.email.value) || !this.is26Char(evt.target.name.value)) {
      this.setState({error: 'Name or Email must be less than 26 characters.'})
    } else {
      this.props.addNewUser({name: evt.target.name.value, isTeacher: true, email: evt.target.email.value, password: evt.target.password.value})
    }
  }

  is26Char(str) {
    return str.length < 27
  }

  is50Char(str) {
    return str.length < 50
  }

  render() {
    return (
      <div>
        <a target="_self" href="/api/auth/login/facebook"><i/>Sign in with Facebook.</a>
        <h4>LOGIN</h4>
        <Login/>
        <br></br>
        <h4>SIGN UP</h4>
        <div>
          <form onSubmit={this.onSignupSubmit}>
            <div>
              <h4>Name:</h4>
              <input
                name="name"
                type="text"
                onChange={this.onChange}
                required
              />
            </div>
            <div>
              <h4>Email:</h4>
              <input
                name="email"
                type="email"
                required
              />
            </div>
            <div>
              <h4>Password:</h4>
              <input
                name="password"
                type="password"
                required
              />
            </div>
            <button type="submit" className="btn btn-block btn-primary">Submit</button>
          </form>
          {this.state.error ? <p style={{color: 'red'}}>{this.state.error}</p> : null}
        </div>
      </div>
    )
  }
}

import {addNewUser} from '../reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {addNewUser},
)(LoginSignUp)
