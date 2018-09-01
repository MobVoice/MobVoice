import React, { Component } from 'react'
import LoginSignUp from './LoginSignUp'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1 className="center">Welcome to MobVoice</h1>
        <LoginSignUp/>
        <button className="to-protest-room" onClick={() => { this.props.history.push('/protest') }}>Go to protest room</button>
      </div>
    )
  }
}
