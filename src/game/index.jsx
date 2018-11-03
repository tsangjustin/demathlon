import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {
  BASIC_MATH,
  PRE_ALGEBRA,
  GEOMETRY,
  COUNTING_MATH,
} from "./games.json";
import { Choice } from "../choice";
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
      problems: problems,

      showResult: false,
      isCorrect: undefined,
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
    } = this.state;
    // Check if correct
    const problem = problems[curr_problem];
    const correct_answer = problem.answer;
    if (userChoice == correct_answer) {
      // Animate the userEarnings
      this.animateUserEarning(3);
      this.animateResult(true);
      this.setState({
        streak: streak + 1,
        userChoice: "",
      }, () => {
        localStorage.setItem("coins", this.state.userEarnings);
      });
    } else {
      this.animateResult(false);
      this.setState({
        streak: 0,
        userChoice: "",
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
    const { isCorrect } = this.state;
    const resultImage = isCorrect ? "/images/correct.jpg" : "/images/wrong.png";
    return (
      <img
          className="Question-Result"
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
    } = this.state;
    const problem = problems[curr_problem];

    return (
      <div className="GamePage">
        <div className="NavBar">
          <Link to="/app">
            <i className="fas fa-arrow-left left-arrow"></i>
          </Link>
        </div>
        <div className="Game">
          <div className="Streak-Meter">
            <StreakMeter streak={streak} />
          </div>
          <div className="Game-Problem">
            <div className="Problem-Container">
              {this.renderProblem(problem)}
              <div className="User-Input">
                <input
                    type="text"
                    onChange={e =>
                      this.handleInput(e.target.value)
                    }
                    value={userChoice} />
                <button onClick={this.handleSubmit}>Enter</button>
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
          </div>
          {/* Coin section */}
          <div className="Coin-Container">
            <p>{userEarnings}</p>
            <img src="/images/coin.jpg" alt="Coin icon" className="Coins" />
          </div>
        </div>
      </div>
    );
  }
}
