import React, { Component } from  "react";
import { Link } from "react-router-dom";

import { GameTab } from "../game-tab";

import "./dashboard.css"

export class DashboardPage extends Component {
  render() {
    return (
      <div className="Dashboard-Page">
        <div className="Profile-Panel">
        </div>
        <div className="Game-Panel">
        <Link to={`/game`}>
          <GameTab
              difficulty="Easy"
              gameText="Basic Math"
              img_path="images/math_operator.png" />
        </Link>
        </div>
        <div className="Leaderboard-Panel">
        </div>
      </div>
    ); 
  }
}
