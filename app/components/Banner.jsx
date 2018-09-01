import React, { Component } from 'react'

export default class Banner extends Component {
  constructor(props) {
    super(props)
    this.state = { protestArr: ['test 1', 'test 2', 'test 3'] }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentProtest.text !== prevProps.currentProtest.text) {
      const arr = this.state.protestArr.concat(this.props.currentProtest.text).slice(-3)
      this.setState({ protestArr: arr })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="ticker-wrap">
          <div className="ticker">
            {this.state.protestArr.map((pText, i) => <div key = {`tick${i}`} className="ticker__item">{pText}</div>)}
          }
          </div>
        </div>
        <button id="fullscreen" onClick={() => { console.log('fullscreen not yet implemented') }}>
          Fullscreen dis
        </button>
        <button id="mute-btn" onClick={this.props.muteRepresentative}>
          {this.props.protestIsMuted ? 'Unmute' : 'Mute'}
        </button>
      </React.Fragment>
    )
  }
}
