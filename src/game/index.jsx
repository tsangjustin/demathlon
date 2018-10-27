import React, { Component } from 'react';

import { Choice } from "../choice";
import { StreakMeter } from "../streak-meter";

import "./game.css"

export class GamePage extends Component {
  constructor(props) {
    super(props);
    this.handleChoiceClick = this.handleChoiceClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      userChoice: undefined,
      streak: 0,
      curr_problem: 0,
      userEarnings: localStorage.getItem("coins") || 0,
    };
  }

  problems = [
    {
      question: "1 + 1",
      answer: 2,
      choices: [11, 1, 2, 4],
    },
    {
      question: "7 * 4",
      answer: 28,
      choices: [28, 32, 47, 74],
    },
  ];

  colors = [
    "#EED6D6",
    "#6FFF98",
    "#FAFCAF",
    "#44DCE5",
  ];

  shapes = [
    "Square",
    "Triangle",
    "Trapezoid",
    "Circle",
  ];

  handleChoiceClick(choice) {
    console.log(choice);
    this.setState({
      userChoice: choice,
    }, this.handleSubmit);
  }

  handleInput(inputValue) {
    this.setState({
      userChoice: inputValue,
    });
  }

  handleSubmit() {
    const { curr_problem, streak, userChoice, userEarnings } = this.state;
    // Check if correct
    const problem = this.problems[curr_problem];
    const correct_answer = problem.answer;
    if (userChoice == correct_answer) {
      this.setState({
        streak: streak + 1,
        curr_problem: (curr_problem + 1) % this.problems.length,
        userEarnings: userEarnings + 3,
      }, () => {
        localStorage.setItem("coins", this.state.userEarnings);
      });
    } else {
      this.setState({
        streak: 0,
        curr_problem: (curr_problem + 1) % this.problems.length,
      });
    }
  }

  render() {
    const { curr_problem, streak, userEarnings } = this.state;

    const problem = this.problems[curr_problem];

    return (
      <div className="Game">
        <div className="Streak-Meter">
          <StreakMeter streak={streak} />
        </div>
        <div className="Game-Problem">
          <p>{problem.question} = </p>
          <input
              type="text"
              onKeyUp={e =>
                this.handleInput(e.target.value)
              } />
          <button onClick={this.handleSubmit}>Enter</button>
          <div className="Choice-Container">
            {problem.choices.map((c, idx) => (
              <Choice
                  key={`choice-${idx}`}
                  color={this.colors[idx]}
                  shape={this.shapes[idx]}
                  value={c}
                  onClick={() => this.handleChoiceClick(c)} />
            ))}
          </div>
        </div>
        {/* Coin section */}
        <div className="Coin-Container">
          <p>{userEarnings}</p>
          <img src="/images/coin.jpg" alt="Coin icon" className="Coins" />
        </div>
      </div>
    );
  }
}
