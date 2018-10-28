import React, { Component } from  "react";
import { Link } from "react-router-dom";

import { Badge } from "../badge";
import { GameTab } from "../game-tab";
import { Modal } from "../modal";
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
    this.state = {
      content: null,
      showBadgeStore: false,
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
  

  renderGames() {
    return (
      <div className="Game-Panel">
        <p>Games</p>
        <div className="Games-Container">
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
    const alreadyOwn = localStorage.getItem("badges") || [
      BASIC_MATH,
      MATH_NINJA,
    ];
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
              <div className="" key={idx}>
                <Badge badge={badge} />
                <div className="Cost-Wrapper">
                  <p>25</p>
                  <img
                      className="Store-Coins"
                      src="/images/coin.jpg"
                      alt="Coin" />
                </div>
                {alreadyOwn.includes(badge)
                  ? <button>Own</button>
                  : <button>Purchase</button>
                }
              </div>
            )
          })}
        </div>
      </div>
    );
  }

  render() {
    const { showBadgeStore } = this.state;
    return (
      <div className="Dashboard-Page">
        {/* <Modal
            content={content}
            showModal={showModal}
            handleClose={this.handleCloseModal} /> */}
        <div className="Profile-Panel">
          <Profile showModal={this.handleShowModal} />
        </div>
        {showBadgeStore ? this.renderBadgeStore() : this.renderGames()}
        <div className="Leaderboard-Panel">
        </div>
      </div>
    ); 
  }
}
