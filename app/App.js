import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Protest from './components/Protest'
import NotFound from './components/NotFound'
import axios from 'axios'

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

  upvoteProtest = (protest) => {
    axios.put(`/api/protests/upvote/${protest.id}`)
    .then(res => res.data)
    .then((protests) => {
      this.getProtests()
    })
  }

  downvoteProtest = (protest) => {
    axios.put(`/api/protests/downvote/${protest.id}`)
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
          upvoteProtest={this.upvoteProtest}
          downvoteProtest={this.downvoteProtest}
          deleteProtest={this.deleteProtest}
          />} />
          <Redirect exact from="/" to="/potest" />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    )
  }
}
