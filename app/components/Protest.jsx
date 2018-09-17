import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import LoginSignUp from './LoginSignUp'
import WhoAmI from './WhoAmI'
import Jokes from './Jokes'
import Banner from './Banner'
import AudioPlayer from './AudioPlayer'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFormChange=this.handleFormChange.bind(this)
  }

  handleFormChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    const d = 175
    const a = Math.ceil(Math.random() * 80 + d)
    const b = Math.ceil(Math.random() * 80 + d)
    const c = Math.ceil(Math.random() * 80 + d)
    const color = `rgb(${a},${b},${c})`
    this.props.addProtest({text: this.state.value, color: color})
    this.setState({value: ''})
  }

  componentDidMount() {
    this.props.getProtests()
  }

  render() {
    let list = this.props.protests
    list.map((protest) => {
      protest.voteCount = 0
      protest.priority = 0
      protest.votes.forEach(vote => {
        if (vote.dir && vote.created_at) {
          protest.priority+=parseInt(vote.dir)
        }
        if (vote.dir) {
          protest.voteCount+=parseInt(vote.dir)
        }
      })
    })
    list = list.sort((a, b) => b.priority-a.priority)

    const user = this.props.user
    return (
      <React.Fragment>
        <nav>
          <Banner
            currentProtest={this.props.currentProtest}
            muteRepresentative={this.props.toggleMuteVoice}
            protestIsMuted={this.props.isMuted}
          />
          <AudioPlayer muted={this.props.protestIsMuted} src={this.props.currentProtest.file?`/mobs/${this.props.currentProtest.file}`:null}/>
        </nav>
        <h1 className="center">***Sample Room Name Here***</h1>
        {this.props.user
          ?<form className="center" onSubmit={this.handleSubmit}>
          <input className="protest-btn" type="submit" value="Submit" disabled={this.state.submitDisabled}/>
          <input type="text" className="protest-input" name="protest" placeholder="Submit a Protest!" value={this.state.value} onChange={this.handleFormChange}/>
          <br/>
        </form>
        :<h3>User is logged out and unable to post & vote but can view room</h3>
        }
        <br/>
        <br/>
        <div className="protest-container">
          {
            list.length
            ?list.map(protest => (
              <div className="protest-bar" style={{backgroundColor: protest.color}} key={protest.id} id={protest.id}>
                <div className="vote-btn-container">
                  <button id={`up${protest.id}`} className="upvote" onClick={this.props.voteProtest.bind(this, protest.id, 1, 'test subject')}>Up Vote</button>
                  <button id={`dn${protest.id}`} className="downvote" onClick={this.props.voteProtest.bind(this, protest.id, -1, 'test subject')}>Dn Vote</button>
                </div>
                <p>Likes: {protest.voteCount}</p>
                <p>{protest.text}</p>
                <button className="del-btn" id={`d${protest.id}`} onClick={this.props.deleteProtest.bind(this, protest)}>Delete</button>
              </div>
            ))
            :null
          }
        </div>
      </React.Fragment>
    )
  }
}
