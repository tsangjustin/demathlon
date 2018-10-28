import React, { Component } from "react";

import { Badge } from "../badge/index.jsx";
import {
  BASIC_MATH,
  MATH_NINJA,
  INTEGRAL,
  MATH_AWESOME,
  NUMBER_ONE,
} from "../badge/badges.json"

import "./profile.css"

export class Profile extends Component {
  render() {
    const { showModal } = this.props;
    const username = localStorage.getItem("name") || "Justin";
    const badges = localStorage.getItem("badges") || [
      BASIC_MATH,
      MATH_NINJA,
    ];
    const coins = localStorage.getItem("coins") || 0;
    return (
      <div>
        <p>{username}</p>
        <p>Badges</p>
        <div className="Badges-Container">
          {badges.map((badge, idx) => {
            return (
              <Badge badge={badge} key={idx} />
            );
          })}
        </div>
        <div>
          <p>Coins: {coins}</p>
          <button onClick={showModal}>Redeem badges</button>
        </div>
      </div>
    );
  }
}