import React, { Component } from "react";

import "./game-tab.css"

export class GameTab extends Component {
  render() {
    const {
      difficulty,
      gameText,
      img_path,
    } = this.props;

    return (
      <div className="Game-Tab">
        <div>
          <p className="SignUp">{gameText}</p>
          <p className="SignUp">{difficulty}</p>
        </div>
        <div>
          <img src={img_path} alt={`Game logo for ${gameText}`} />
        </div>
      </div>
    );
  };
}