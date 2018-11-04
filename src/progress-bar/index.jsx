import React, { Component } from "react";

import "./progress.css";

export class ProgressBar extends Component {
  render() {
    const {current, total} = this.props;
    return (
      <div className="Game-Progress progress progress-striped active">
        <div
            className="progress-bar"
            role="progressbar"
            style={{width: `${current/total*100}%`}}
            aria-valuenow={current}
            aria-valuemin="0"
            aria-valuemax={total} />
      </div>
    );
  }
}