import React, { Component } from "react";
import LoginSignUp from "./LoginSignUp";
import WhoAmI from "./WhoAmI";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1 className="center">Welcome to MobVoice</h1>
        {!this.props.user ? <LoginSignUp /> : <WhoAmI />}
        {this.props.user ? (
          <button
            className="to-protest-room"
            style={{ marginTop: "15px" }}
            onClick={() => {
              this.props.history.push("/protest");
            }}
          >
            Go to protest room
          </button>
        ) : null}
      </div>
    );
  }
}
