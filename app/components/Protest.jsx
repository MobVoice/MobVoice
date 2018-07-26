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
    const list = this.props.protests
    return (
      <React.Fragment>
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
          ?list.map(protest => (
            <div style={{backgroundColor: protest.color}} key={protest.id} id={protest.id}>
            <button id={`up${protest.id}`} onClick={this.props.upvoteProtest.bind(this, protest)}>Up Vote</button>
              <button id={`dn${protest.id}`} onClick={this.props.downvoteProtest.bind(this, protest)}>Dn Vote</button>
              <p>likes:{protest.likes}</p>
              <p>{protest.text}</p>
              <button id={`d${protest.id}`} onClick={this.props.deleteProtest.bind(this, protest)}>Delete</button>
            </div>
          ))
          :null
        }
      </React.Fragment>
    )
  }
}
