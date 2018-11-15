import React, { Component } from "react";

import "./leaderboard.css";

export class Leaderboard extends Component {
  constructor(props) {
    super(props);
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) ||
      [
        {
          name: "John",
          points: 100,
        },
        {
          name: "Alex",
          points: 25,
        },
        {
          name: "Keyur",
          points: 10,
        },
        {
          name: "Ning",
          points: 20,
        },
        {
          name: "Justin",
          points: 0,
        },
      ];
    const username = this.props.user.displayName;
    const user_points = Number(localStorage.getItem("user_record")) || 0;
    const full_leaderboard = [
      ...leaderboard,
      {
        id: 1,
        name: username,
        points: user_points,
      },
    ];
    this.state = {
      leaderboard: full_leaderboard,
    }
  }

  render() {
    const { leaderboard } = this.state;
    const sorted_leaderboard = leaderboard.sort((p1, p2) => (p1.points < p2.points)
      ? 1
      : (p1.points > p2.points)
        ? -1
        : 0
    );
    console.log(sorted_leaderboard);
    return (
      <div className="Leaderboard-Container">
        <p className="Title">Leaderboard</p>
        <ol>
          {sorted_leaderboard.map((player, idx) => (
            <li key={`player-${idx}`}>
              <div className="Leaderboard-Row">
                <p style={(player.id === 1) ? {
                  color: "#50BA62",
                } : {}}>
                  {player.name}
                </p>
                <p style={(player.id === 1) ? {
                  color: "#50BA62",
                } : {}}>
                  {player.points}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}