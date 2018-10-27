import React, { Component } from "react";

export class Profile extends Component {
  render() {
    const username = localStorage.getItem("name") || "Justin";
    const badges = localStorage.getItem("badges") || [];
    const coins = localStorage.getItem("coins") || 0;
    return (
      <div>
        <p>{username}</p>
        <p>Badges</p>
        <div>
          {badges.map((badge, idx) => {
            return (
              <div key={idx}>
                <img src={badge} alt="Badge" />
              </div>
            );
          })}
        </div>
        <div>
          <o>Coins: {coins}</o>
          <button>Redeem badges</button>
        </div>
      </div>
    );
  }
}