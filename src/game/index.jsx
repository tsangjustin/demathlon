import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { SignOutButton } from '../signout';

import {
    CORRECT,
    YUP,
    AWESOME,
    GREEN,
    CONGRATS,
    BANANA,
    PIKACHU,
    CHECK,
    THUMBS_UP,
    CHIPMUNK,
    SPONGEBOB,
    ADVENTURE_TIME,
} from "../badge/badges.json";
import {
    BASIC_MATH,
    PRE_ALGEBRA,
    GEOMETRY,
    COUNTING_MATH,
} from "./games.json";
import { Choice } from "../choice";
import { ProgressBar } from '../progress-bar';
import { StreakMeter } from "../streak-meter";

import "./game.css"

export class GamePage extends Component {
    constructor(props) {
        super(props);
        const url_params = (props.match || {}).params;
        let game_type = undefined;
        if (url_params) {
            game_type = url_params.game_type;
        }
        const problems = this.getGameTypeProblems(game_type);

        this.animateUserEarning = this.animateUserEarning.bind(this);
        this.animateResult = this.animateResult.bind(this);
        this.getGameTypeProblems = this.getGameTypeProblems.bind(this);
        this.handleChoiceClick = this.handleChoiceClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderProblem = this.renderProblem.bind(this);
        this.renderResult = this.renderResult.bind(this);
        this.state = {
            userChoice: "",
            streak: 0,
            curr_problem: 0,
            userEarnings: Number(localStorage.getItem("coins")) || 0,
            animationUsing: Number(localStorage.getItem("correct_animation")) || CORRECT,
            problems: problems,

            showResult: false,
            isCorrect: undefined,

            answered: 0,
            correct: 0,
        };
    }

    colors = [
        "#648FFF",
        "#785EF0",
        "#DC267F",
        "#FE6100",
        "#FFB000",
        "#61F780", //Green
    ];

    shapes = [
        "Square",
        "Triangle",
        "Trapezoid",
        "Circle",
    ];

    getGameTypeProblems(game_type) {
        if (game_type == "basic_math") {
            return BASIC_MATH;
        } else if (game_type === "pre_algebra") {
            return PRE_ALGEBRA;
        } else if (game_type === "geometry") {
            return GEOMETRY;
        } else if (game_type === "counting_math") {
            return COUNTING_MATH;
        } else {
            throw Error("Invalid game type");
        }
    }

    handleChoiceClick(choice) {
        this.setState({
            userChoice: choice,
        }, this.handleSubmit);
    }

    handleInput(inputValue) {
        this.setState({
            userChoice: inputValue,
        });
    }

    animateUserEarning(x) {
        if (x > 0) {
            setTimeout(() => {
                const { userEarnings } = this.state;
                this.setState({
                    userEarnings: userEarnings + 1
                }, () => this.animateUserEarning(x - 1));
            }, 100);
        }
    }

    animateResult(isCorrect) {
        const { curr_problem, problems } = this.state;
        this.setState({
            showResult: true,
            isCorrect: isCorrect,
        }, () => {
            setTimeout(() => {
                this.setState({
                    curr_problem: (curr_problem + 1) % problems.length,
                    showResult: false,
                    isCorrect: undefined,
                });
            }, 2000);
        });
    }


    handleSubmit() {
        const {
            curr_problem,
            problems,
            streak,
            userChoice,
            answered,
            correct,
            userEarnings,
        } = this.state;
        // Check if correct
        const problem = problems[curr_problem];
        const correct_answer = problem.answer;
        let coinEarn = 5;
        if (userChoice == correct_answer) {
            let audio = new Audio("/audio/Coin_Drop.mp3");
            audio.play();
            // Animate the userEarnings
            this.animateUserEarning(coinEarn);
            this.animateResult(true);
            this.setState({
                streak: streak + 1,
                userChoice: "",
                answered: answered + 1,
                correct: correct + 1,
            }, () => {
                localStorage.setItem("coins", userEarnings + coinEarn);
                const user_points = Number(localStorage.getItem("user_record")) || 0;
                localStorage.setItem("user_record", user_points + coinEarn);
            });
        } else {
            this.animateResult(false);
            this.setState({
                streak: 0,
                userChoice: "",
                answered: answered + 1,
            });
        }
    }

    renderProblem(problem) {
        let problemChildren = [];
        if (problem.question) {
            problemChildren.push(
                <p dangerouslySetInnerHTML={{ __html: `${problem.question} = ` }}></p>
            );
        } 
        if (problem.image) {
            problemChildren.push(
                <img src={problem.image} alt="Problem" />
            );
        }
        return problemChildren;
    }

    renderResult() {
        const { animationUsing, isCorrect } = this.state;
        let correct_animation = "/images/correct.jpg";
        if (animationUsing === CORRECT) {
            correct_animation = "/images/correct.jpg";
        } else if (animationUsing === YUP) {
            correct_animation = "/images/animation/yup.gif";
        } else if (animationUsing === CONGRATS) {
            correct_animation = "/images/animation/congrats.gif"
        } else if (animationUsing === AWESOME) {
            correct_animation = "/images/animation/awesome.gif"
        } else if (animationUsing === GREEN) {
            correct_animation = "/images/animation/green.gif"
        } else if (animationUsing === BANANA) {
            correct_animation = "/images/animation/banana.gif"
        } else if (animationUsing === PIKACHU) {
            correct_animation = "/images/animation/pikachu.gif"
        } else if (animationUsing === CHECK) {
            correct_animation = "/images/animation/check.gif"
        } else if (animationUsing === THUMBS_UP) {
            correct_animation = "/images/animation/thumbs_up.gif"
        } else if (animationUsing === CHIPMUNK) {
            correct_animation="/images/animation/chipmunk.gif"
        } else if (animationUsing === SPONGEBOB) {
            correct_animation="/images/animation/spongebob.gif"
        } else if (animationUsing === ADVENTURE_TIME) {
            correct_animation="/images/animation/adventure_time.gif"
        } else {
            correct_animation = "/images/correct.jpg";
        }
        const resultImage = isCorrect ? correct_animation : "/images/wrong.png";
        return (
            <img
                className="animated fadeIn Question-Result"
                src={resultImage}
                alt="Question result" />
        );
    }

    render() {
        const {
            curr_problem,
            problems,
            showResult,
            streak,
            userChoice,
            userEarnings,
            answered,
            correct,
        } = this.state;
        const problem = problems[curr_problem];

        // TODO (justint): Add encouraging word to continue playing
        return (
            <div className="GamePage">
                <div className="NavBar">
                    <Link to="/app">
                        <i className="fas fa-arrow-left left-arrow"></i>
                        <p style={{color: "#0058ba"}}>Back</p>
                    </Link>
                    <SignOutButton />
                </div>
                <div className="Game">
                    <div className="Streak-Meter">
                        <StreakMeter streak={streak} />
                    </div>
                    <div className="Game-Problem">
                        <div className="Problem-Container">
                            {this.renderProblem(problem)}
                            <div className="User-Input">
                            <label for="user-response"></label>
                                <input
                                    type="text"
                                    id="user-response"
                                    onChange={e =>
                                            this.handleInput(e.target.value)
                                    }
                                    value={userChoice} />
                                <button
                                    className="btn"
                                    disabled={showResult} 
                                    onClick={this.handleSubmit}>Enter</button>
                            </div>
                        </div>
                        {showResult
                                ? this.renderResult()
                                : <div className="Choice-Container">
                                    {problem.choices.map((c, idx) => (
                                        <Choice
                                            key={`choice-${idx}`}
                                            color={this.colors[idx]}
                                            shape={this.shapes[idx]}
                                            value={c}
                                            onClick={() => this.handleChoiceClick(c)} />
                                    ))}
                                </div>
                        }
                        <div className="Game-Info-Wrapper">
                            <div className="Game-Info">
                                <p>Answered: {answered}</p>
                                <p>Correct: {correct}</p>
                                <p>Streak: {streak}</p>
                            </div>
                            <ProgressBar current={curr_problem} total={problems.length} />
                        </div>
                    </div>
                    {/* Coin section */}
                    <div className="Coin-Container">
                        <p className="User-Coins">{userEarnings}</p>
                        <img src="/images/coin.jpg" alt="Coin icon" className="Coins" />
                    </div>
                </div>
            </div>
        );
    }
}
