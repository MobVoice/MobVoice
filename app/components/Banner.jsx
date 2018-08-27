import React, { Component } from 'react'

export default class Banner extends Component {
  constructor(props) {
    super(props)
    this.state = { protestArr: ["test 1", "test 2", "test 3"] }
  }

  componentDidUpdate(prevProps){
    if(this.props.currentProtest.text !== prevProps.currentProtest.text){
      var arr = this.state.protestArr.concat(this.props.currentProtest.text).slice(-3)
      this.setState({ protestArr: arr })
    }
  }

  render() {
    return (
      <div>
        <div className="ticker-wrap">
          <div className="ticker">
            {this.state.protestArr.map((pText, i)=>{
              return <div key = {`tick${i}`} className="ticker__item">{pText}</div>
            })}
          }
          </div>
        </div>      
      </div>
    )
  }
}