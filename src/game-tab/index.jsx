import React, { Component } from "react";

export class GameTab extends Component {
  render() {
    const { gameText } = this.props;
    return (
      <div>
        <p>{gameText}</p>
      </div>
    );
  };
}