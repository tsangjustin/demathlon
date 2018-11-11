import React, { Component } from  "react";
import { Link } from "react-router-dom";

import { Badge } from "../badge";
import { GameTab } from "../game-tab";
import { Leaderboard } from "../leaderboard";
import { Profile } from "../profile";
import { SignOutButton } from '../signout';
import {
    BASIC_MATH,
    MATH_NINJA,
    INTEGRAL,
    MATH_AWESOME,
    NUMBER_ONE,
    BLUE_TRIANGLE,
    ANGLE,
    CORRECT,
    YUP,
    CONGRATS,
    AWESOME,
    GREEN,
    BANANA,
    PIKACHU,
    CHECK,
    THUMBS_UP,
    CHIPMUNK,
    ADVENTURE_TIME,
    SPONGEBOB,
} from "../badge/badges.json";

import "./dashboard.css"


export class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleUseCelebration = this.handleUseCelebration.bind(this);
        this.renderBadgeStore = this.renderBadgeStore.bind(this);
        this.renderGames = this.renderGames.bind(this);
        const badges = JSON.parse(localStorage.getItem("badges")) || [];
        const coins = Number(localStorage.getItem("coins")) || 0;
        const animationgUsing = Number(localStorage.getItem("correct_animation")) || CORRECT;
        this.state = {
            content: null,
            showBadgeStore: false,
            badges: badges,
            coins: coins,
            animationgUsing: animationgUsing,
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

    handleUseCelebration(badge) {
        localStorage.setItem("correct_animation", badge);
        this.setState({
            animationgUsing: badge,
        });
    }

    renderGames() {
        return (
            <div className="Game-Panel">
                <p className="Title">Games</p>
                <div className="Games-Container">
                    <Link to={`/game/basic_math`}>
                        <GameTab
                            difficulty="Easy"
                            gameText="Basic Math"
                            img_path="images/math_operator.png" />
                    </Link>
                    <Link to={`/game/pre_algebra`}>
                        <GameTab
                            difficulty="Medium"
                            gameText="Pre Algebra"
                            img_path="images/pre_algebra.jpg" />
                    </Link>
                    <Link to={`/game/geometry`}>
                        <GameTab
                            difficulty="Medium"
                            gameText="Geometry"
                            img_path="images/geometry.jpg" />
                    </Link>
                    <Link to={`/game/counting_math`}>
                        <GameTab
                            difficulty="Easy"
                            gameText="Counting Math"
                            img_path="images/numbers.jpg" />
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
        const { animationgUsing } = this.state;
        const badges = [
            BASIC_MATH,
            MATH_NINJA,
            INTEGRAL,
            MATH_AWESOME,
            NUMBER_ONE,
            BLUE_TRIANGLE,
            ANGLE,
        ];
        const animations = [
            CORRECT,
            YUP,
            CONGRATS,
            AWESOME,
            GREEN,
            BANANA,
            PIKACHU,
            CHECK,
            THUMBS_UP,
            CHIPMUNK,
            ADVENTURE_TIME,
            SPONGEBOB,
        ];
        const cost = 50;
        const alreadyOwn = localStorage.getItem("badges") || [];
        return (
            <div className="Game-Panel">
                <span
                    className="closebtn"
                    onClick={this.handleCloseModal}>
                    &times;
                </span>
                <p className="Title">Badge Store</p>
                <div className="Badge-Store-Wrapper">
                    <div
                            lassName="Badge-Container"
                            style={{
                                height: "750px"
                            }}>
                        <p>Badges</p>
                        <div className="Badges-Wrapper">
                            {badges.map((badge, idx) => {
                                return (
                                    <div
                                            className="Badge-Wrapper"
                                            key={`badge-${idx}`}>
                                        <Badge badge={badge} />
                                        {alreadyOwn.includes(badge)
                                            ? <button className="btn Own">Own</button>
                                            : <button
                                                className="btn Purchase"
                                                onClick={() => this.handlePurchaseBadge(badge, cost)}>
                                                    <div className="Cost-Wrapper">
                                                        <p>{cost}</p>
                                                        <img
                                                            className="Store-Coins"
                                                            src="/images/coin.jpg"
                                                            alt="Coin" />
                                                    </div>
                                                </button>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="Badge-Container">
                        <p>Celebration</p>
                        <div className="Badges-Wrapper">
                            {animations.map((badge, idx) => {
                                console.log(badge, animationgUsing);
                                return (
                                    <div className="Badge-Wrapper" key={`badge-${idx}`}>
                                        <Badge badge={badge} />
                                        {alreadyOwn.includes(badge) || badge === CORRECT
                                                ? animationgUsing === badge
                                                ? <button className="btn Own">Using</button>
                                                : <button
                                                    className="btn Purchase"
                                                    onClick={() => this.handleUseCelebration(badge)}>Use</button>
                                                : <button
                                                    className="btn Purchase"
                                                    onClick={() => this.handlePurchaseBadge(badge, cost * 2)}>
                                                        <div className="Cost-Wrapper">
                                                            <p>{cost * 2}</p>
                                                            <img
                                                                className="Store-Coins"
                                                                src="/images/coin.jpg"
                                                                alt="Coin" />
                                                        </div>
                                                    </button>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { badges, coins, showBadgeStore } = this.state;
        return (
            <div className="Dashboard-Wrapper">
                <div className="NavBar">
                    <div className="Company-Wrapper">
                        <img
                            className="Logo-Image"
                            src="/images/logo.png"
                            alt="Company logo" />
                        <p>DeMathlon</p>

                    </div>
                    <SignOutButton />
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
                  user={this.props.authUser}
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
