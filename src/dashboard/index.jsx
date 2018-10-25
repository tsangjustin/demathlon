import React, { Component } from  "react";

import { GameTab } from "../game-tab";

export class DashboardPage extends Component {
  render() {
    return (
      <div>
        <div className="Profile-Panel">
        </div>
        <div className="Game-Panel">
          <GameTab gameText="Basic Math" />
        </div>
        <div className="Leaderboard-Panel">
        </div>
      </div>
    ); 
  }
}
