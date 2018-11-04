import React, { Component } from "react";

import "./progress.css";

export class ProgressBar extends Component {
  render() {
    const {current, total} = this.props;
    const percent_complete = current/total*100
    return (
      <div id="Game-Progress" className="progress progress-striped active ">
        <div
            className="progress-bar"
            id="Current-Progress"
            role="progressbar"
            style={{width: `${percent_complete}%`}}
            aria-valuenow={current}
            aria-valuemin="0"
            aria-valuemax={total}>
          {Math.round(percent_complete)}%
        </div>
      </div>
    );
  }
}