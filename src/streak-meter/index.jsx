import * as React from "react";

import "./streak-meter.css";

export class StreakMeter extends React.Component {
  constructor(props) {
    super(props);
    this.change_bar_color = this.change_bar_color.bind(this);
    this.getStreakAnimation = this.getStreakAnimation.bind(this);
  }

  change_bar_color() {
    const { streak } = this.props;
    if (streak < 5) {
      return "#F7B035";
    } else if (streak < 10) {
      return "#FD9014";
    } else if (streak < 15) {
      return "#FE6F10";
    } else if (streak < 20) {
      return "#FE5050";
    } else {
      return "#FE0101";
    }
  }

  getStreakAnimation() {
    const { streak } = this.props;
    // if (streak < 5) {
    //   return "";
    // } else if (streak < 10) {
    //   return "shake-1";
    // } else if (streak < 15) {
    //   return "shake-2";
    // } else if (streak < 20) {
    //   return "shake-3";
    // } else {
    //   return "shake-3";
    // }
    return  "";
  }

  render() {
    const { streak } = this.props;
    return (
      <div className={`Meter-Container ${streak >= 5 && `animated On-Fire ${this.getStreakAnimation()}`}`}>
        <img src="/images/thermometer.png" alt="Thermometer" />
        <svg className="Bar" width="18" height="235">
          <rect
              width="18"
              height={10 * streak}
              fill={this.change_bar_color()}
              rx="0"
              ry="0">
          </rect>
        </svg>
      </div>
    );
  }
}