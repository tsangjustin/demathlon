import * as React from "react";

import "./streak-meter.css";

export class StreakMeter extends React.Component {
  render() {
    const { streak } = this.props;
    return (
      <div className="Meter-Container">
        <img src="/images/thermometer.png" />
        <svg className="Bar" width="18" height="100">
          <rect
              width="18"
              height={streak}
              fill="#7FFF00"
              rx="0"
              ry="0"
              transform="scale(-1, 1)">
          </rect>
        </svg>
      </div>
    );
  }
}