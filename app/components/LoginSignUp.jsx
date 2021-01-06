import React from 'react'
import { Link } from 'react-router-dom'
import store from '../store'
import Login from './Login'
import WhoAmI from './WhoAmI'
import axios from 'axios'

class LoginSignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '', error: '', showLogin: true }
    this.onSignupSubmit = this.onSignupSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    this.setState({ value: event.target.value })
  }

  onSignupSubmit(evt) {
    evt.preventDefault()
    if (!this.is50Char(evt.target.email.value) || !this.is26Char(evt.target.name.value)) {
      this.setState({ error: 'Name or Email must be less than 26 characters.' })
    } else {
      this.props.addNewUser({ name: evt.target.name.value, isTeacher: true, email: evt.target.email.value, password: evt.target.password.value })
    }
  }

  is26Char(str) {
    return str.length < 27
  }

  is50Char(str) {
    return str.length < 50
  }

  toggleForm = () => {
    this.setState({
      showLogin: !this.state.showLogin
    })
  }

  render() {
    const formContainerStyle = {
      maxWidth: '400px',
      width: '100%',
      margin: '30px auto',
      padding: '0',
    }
    const toggleBtnStyle = {
      width: '50%',
      backgroundColor: '#000',
      color: '#ddd',
      padding: '10px 0',
      border: 'none',
      outline: 'transparent'
    }
    const toggleBtnLightStyle = {
      width: '50%',
      backgroundColor: '#000',
      color: '#ddd',
      padding: '10px 0',
      border: 'none',
      outline: 'transparent',
      opacity: '.6'
    }

    return (
      <div className='login-container'>
        <div style={formContainerStyle}>
          {this.state.showLogin
            ? (
              <React.Fragment>
                <div style={{display: 'flex', border: '1px solid #000'}}>
                  <button style={toggleBtnLightStyle} onClick={this.toggleForm}>Signup</button>
                  <button style={toggleBtnStyle }>Login</button>
                </div>                
             
                <div className="auth-form">
                    <a className="auth-fbook" target="_self" href="/api/auth/login/facebook">                
                {/* <img src="../social/f_logo_RGB-Blue_58.png" alt="facebook logo"/>  */}
 Sign in with Facebook</a><h4 className='line-through'> <span> OR </span></h4>
                  <Login />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div style={{display: 'flex', border: '1px solid #000'}}>
                  <button style={toggleBtnStyle}>Signup</button>
                  <button style={toggleBtnLightStyle} onClick={this.toggleForm} >Login</button>
                </div>
                <div >
                  <h4 style={{marginBottom: '20px'}}>SIGN UP</h4>
                  <form onSubmit={this.onSignupSubmit}>
                    <div className="form-child">
                      <h4>Name</h4>
                      <input
                        className='form-style'
                        name="name"
                        type="text"
                        onChange={this.onChange}
                        required
                      />
                    </div>
                    <div>
                      <h4>Email</h4>
                      <input
                        className='form-style'
                        name="email"
                        type="email"
                        required
                      />
                    </div>
                    <div className="form-child">
                      <h4>Password</h4>
                      <input
                        className='form-style'
                        name="password"
                        type="password"
                        required
                      />
                    </div>
                    <button style={{marginTop: '10px'}} type="submit" className="btn btn-block btn-primary">Submit</button>
                  </form>
                  {this.state.error ? <p style={{ color: 'red' }}>{this.state.error}</p> : null}
                </div>
              </React.Fragment>
            )}
        </div>
      </div>
    )
  }
}

import { addNewUser } from '../reducers/auth'
import { connect } from 'react-redux'

export default connect(
  state => ({}),
  { addNewUser },
)(LoginSignUp)
