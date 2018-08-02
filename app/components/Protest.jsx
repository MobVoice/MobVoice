import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
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
    list.map((protest)=>{
      protest.voteCount = 0
      protest.votes.forEach(vote=>{
        if(vote.dir){
          protest.voteCount+=parseInt(vote.dir)
        }
      })
    })
    list = list.sort((a, b)=>{
      return b.voteCount-a.voteCount;
    })
    return (
      <React.Fragment>
        <a target="_self" href="/api/auth/login/facebook"><i className="fa fa-facebook"/>facebook</a>
        <h1>Sample protest component header</h1>
        <form onSubmit={this.handleSubmit}>
          <h5 className="nav-header">enter some info<br/></h5>
          <input type="text" name="firstname" value={this.state.value} onChange={this.handleFormChange}/>
          <br/>
          <input id="sub-btn" className="btn btn-primary width-50" type="submit" value="Submit" disabled={this.state.submitDisabled}/>
        </form>
        <br/>
        {
          list.length
          ?list.map(protest => {
            return (
            <div style={{backgroundColor: protest.color}} key={protest.id} id={protest.id}>
            <button id={`up${protest.id}`} onClick={this.props.voteProtest.bind(this, protest.id, 1, 'test subject')}>Up Vote</button>
              <button id={`dn${protest.id}`} onClick={this.props.voteProtest.bind(this, protest.id, -1, 'test subject')}>Dn Vote</button>
              <p>likes:{protest.voteCount}</p>
              <p>{protest.text}</p>
              <button id={`d${protest.id}`} onClick={this.props.deleteProtest.bind(this, protest)}>Delete</button>
            </div>)}
          )
          :null
        }
      </React.Fragment>
    )
  }
}
