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
    const { badges, coins, showModal} = this.props;
    const username = this.props.user.displayName;
    return (
      <div className="Profile-Container">
        <div className="Name-Badge-Wrapper">
          <p className="Title">{username}</p>
          <p className="Title">Badges</p>
          <div className="Badges-Container">
            {badges.map((badge, idx) => {
              return (
                <Badge
                    badge={badge}
                    key={`profile-badge-${idx}`} />
              );
            })}
          </div>
        </div>
        <div className="Redeem-Badge-Container">
          <div className="User-Coins-Container">
            <p>{coins}</p>
            <img src="/images/coin.jpg" alt="Coins" />
          </div>
          <button className="btn redeem-button" onClick={showModal}>Redeem badges</button>
        </div>
      </div>
    );
  }
}
