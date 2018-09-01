'use strict'

/**
 * `babel-preset-env` converts this general import into a selection of specific
 * imports needed to polyfill the currently-supported environment (as specified
 * in `.babelrc`). As of 2017-06-04, this is primarily to support async/await.
 */
import 'babel-polyfill'

import React from 'react'
import {BrowserRouter as Router, withRouter, Route, Redirect, Switch} from 'react-router-dom'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Banner from './components/Banner'
import App from './App'

const MobVoiceApp = withRouter(connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children, location, history }) =>
    <div>
        <App user={user} location={location} history={history}/>
    </div>
))

render(
  <Provider store={store}>
    <Router>
      <MobVoiceApp />
    </Router>
  </Provider>,
  document.getElementById('main')
)
