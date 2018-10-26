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
          <p>{gameText}</p>
          <p>{difficulty}</p>
        </div>
        <div>
          <img src={img_path} />
        </div>
      </div>
    );
  };
}