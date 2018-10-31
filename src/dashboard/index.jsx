import React, { Component } from  "react";
import { Link } from "react-router-dom";

import { Badge } from "../badge";
import { GameTab } from "../game-tab";
import { Leaderboard } from "../leaderboard";
import { Profile } from "../profile";
import {
  BASIC_MATH,
  MATH_NINJA,
  INTEGRAL,
  MATH_AWESOME,
  NUMBER_ONE,
} from "../badge/badges.json";

import "./dashboard.css"


export class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderBadgeStore = this.renderBadgeStore.bind(this);
    this.renderGames = this.renderGames.bind(this);
    const badges = JSON.parse(localStorage.getItem("badges")) || [];
    const coins = Number(localStorage.getItem("coins")) || 0;
    this.state = {
      content: null,
      showBadgeStore: false,
      badges: badges,
      coins: coins,
    };
  }

  handleShowModal(modalContent) {
    this.setState({
      content: modalContent,
      showBadgeStore: true,
    });
  }

  handleCloseModal() {
    this.setState({
      conten: null,
      showBadgeStore: false,
    });
  }

  handlePurchaseBadge(badge, cost) {
    const alreadyOwn = JSON.parse(localStorage.getItem("badges")) || [];
    const coins = Number(localStorage.getItem("coins")) || 0;
    if (coins >= cost) {
      const newBadges = alreadyOwn.concat(badge);
      const newCoins = coins - cost;
      localStorage.setItem("badges", JSON.stringify(newBadges));
      localStorage.setItem("coins", newCoins);
      this.setState({
        badges: newBadges,
        coins: newCoins,
      });
    }
  }

  renderGames() {
    return (
      <div className="Game-Panel">
        <p>Games</p>
        <div className="Games-Container">
          <Link to={`/game/basic_math`}>
            <GameTab
                difficulty="Easy"
                gameText="Basic Math"
                img_path="images/math_operator.png" />
          </Link>
          <Link to={`/game`}>
            <GameTab
                difficulty="Easy"
                gameText="Basic Math"
                img_path="images/math_operator.png" />
          </Link>
          <Link to={`/game`}>
            <GameTab
                difficulty="Easy"
                gameText="Basic Math"
                img_path="images/math_operator.png" />
          </Link>
          <Link to={`/game`}>
            <GameTab
                difficulty="Easy"
                gameText="Basic Math"
                img_path="images/math_operator.png" />
          </Link>
          <Link to={`/game`}>
            <GameTab
                difficulty="Easy"
                gameText="Basic Math"
                img_path="images/math_operator.png" />
          </Link>
        </div>
      </div>
    );
  }

  renderBadgeStore() {
    const badges = [
      BASIC_MATH,
      MATH_NINJA,
      INTEGRAL,
      MATH_AWESOME,
      NUMBER_ONE,
    ];
    const alreadyOwn = localStorage.getItem("badges") || [];
    return (
      <div className="Game-Panel">
        <p
            className="closebtn"
            onClick={this.handleCloseModal}>
          &times;
        </p>
        <p>Badge Store</p>
        <div className="Badge-Store-Wrapper">
          {badges.map((badge, idx) => {
            return (
              <div className="Badge-Wrapper" key={idx}>
                <Badge badge={badge} />
                <div className="Cost-Wrapper">
                  <p>25</p>
                  <img
                      className="Store-Coins"
                      src="/images/coin.jpg"
                      alt="Coin" />
                </div>
                {alreadyOwn.includes(badge)
                  ? <button className="Own">Own</button>
                  : <button
                      className="Purchase"
                      onClick={() => this.handlePurchaseBadge(badge, 25)}>Purchase</button>
                }
              </div>
            )
          })}
        </div>
      </div>
    );
  }

  render() {
    const { badges, coins, showBadgeStore } = this.state;
    return (
      <div className="Dashboard-Wrapper">
        <div className="NavBar">
          <p>DeMathlon</p>
        </div>
        <div className="Dashboard-Page">
          {/* <Modal
              content={content}
              showModal={showModal}
              handleClose={this.handleCloseModal} /> */}
          <div className="Profile-Panel">
            <Profile
                showModal={this.handleShowModal}
                badges={badges}
                coins={coins} />
          </div>
          {showBadgeStore ? this.renderBadgeStore() : this.renderGames()}
          <div className="Leaderboard-Panel">
              <Leaderboard />
          </div>
        </div>
      </div>
    ); 
  }
}
