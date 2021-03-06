import React from 'react'

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami" style={{textAlign: 'center'}}>
    <span className="whoami-user-name">{user && user.name}</span>
    <button className="logout" onClick={logout}>Logout</button>
  </div>
)

import {logout} from '../reducers/auth'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(WhoAmI)
