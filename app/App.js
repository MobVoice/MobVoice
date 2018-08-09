import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Protest from './components/Protest'
import NotFound from './components/NotFound'
import axios from 'axios'
const io = require('socket.io-client')
const socket = io()
socket.on('protest', (res) => {
  console.log(res)
})

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      protests: []
    }
  }

  getProtests = () => {
    axios.get('/api/protests')
    .then(res => res.data)
    .then((protests) => {
      this.setState({protests: protests})
    })
  }

  addProtest = (protest) => {
    axios.post('/api/protests', protest)
    .then(res => res.data)
    .then((protests) => {
      this.getProtests()
    })
  }

  addNewUser = (user) => {
    axios.post('api/users', user)
  }

  voteProtest = (pid, dir, sm) => {
    // pid = protest id
    // dir = vote direction
    // sm = submob (like a subreddit), currently harcoded to 'test subject'
    axios.post(`/api/votes?pid=${pid}&dir=${dir}&sm=${sm}`)
    .then(res => res.data)
    .then((protests) => {
      this.getProtests()
    })
  }

  deleteProtest = (protest) => {
    axios.delete(`/api/protests/${protest.id}`)
    .then(res => res.data)
    .then((protests) => {
      this.getProtests()
    })
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/protest" render={(props) => <Protest {...props}
          protests={this.state.protests}
          getProtests={this.getProtests}
          addProtest={this.addProtest}
          voteProtest={this.voteProtest}
          upvoteProtest={this.upvoteProtest}
          downvoteProtest={this.downvoteProtest}
          deleteProtest={this.deleteProtest}
          user={this.props.user}
          />} />
          <Redirect exact from="/" to="/protest" />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    )
  }
}
