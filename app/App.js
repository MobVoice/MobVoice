import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Protest from './components/Protest'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import axios from 'axios'
const io = require('socket.io-client')
const socket = io()

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      protests: [],
      currentProtest: {},
      isMuted: false
    }
  }

  componentDidMount() {
    socket.on('protest', (res) => {
      this.setState({currentProtest: res})
    })
  }

  toggleMuteVoice=() => {
    this.setState({ isMuted: !this.state.isMuted })
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
        <nav>
          <Banner currentProtest={this.state.currentProtest}/>      
        </nav>
        <Switch>
          <Route path="/home" render={(props) => <Home {...props}
            history={this.props.history}
            user={this.props.user}
          />} />
          <Route path="/protest" render={(props) => <Protest {...props}
            protests={this.state.protests}
            currentProtest={this.state.currentProtest}
            getProtests={this.getProtests}
            addProtest={this.addProtest}
            voteProtest={this.voteProtest}
            upvoteProtest={this.upvoteProtest}
            downvoteProtest={this.downvoteProtest}
            deleteProtest={this.deleteProtest}
            user={this.props.user}
            isMuted={this.state.isMuted}
          />} />
          <Redirect exact from="/" to="/home" />
          <Route component={NotFound} />
        </Switch>
        <Footer history={this.props.history}/>
      </React.Fragment>
    )
  }
}
