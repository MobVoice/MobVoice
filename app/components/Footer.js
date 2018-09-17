import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <button className="ftr-btn home-redirect" onClick={() => { this.props.history.push('/home') }}>Home</button>
        {this.props.user?<button className="ftr-btn messages-redirect" onClick={() => { this.props.history.push('/messages') }}>Messages</button>:null}
        {this.props.user?<button className="ftr-btn profile-redirect" onClick={() => { this.props.history.push('/profile') }}>My Profile</button>:null}
      </div>
    )
  }
}
