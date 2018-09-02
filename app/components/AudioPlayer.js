import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export default class AudioPlayer extends React.Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      const audio = document.getElementById('player')
      audio.load()
      audio.play()
    }
  }

  render() {
    return (
      <React.Fragment>
        <audio id="player" muted={this.props.muted}>
          <source src={this.props.src} type="audio/mpeg"></source>
        </audio>
      </React.Fragment>
    )
  }
}
