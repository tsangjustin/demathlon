import React, { Component } from "react";

import {
  BASIC_MATH,
  MATH_NINJA,
  INTEGRAL,
  MATH_AWESOME,
  NUMBER_ONE,
} from "./badges.json";

import "./badge.css"

export class Badge extends Component {
  constructor(props) {
    super(props);
    this.renderBadge = this.renderBadge.bind(this);
  }

  renderBadge() {
    const { badge } = this.props;
    if (badge === BASIC_MATH) {
      return (
        <img
            className="Badge"
            src="/images/sticker_4.png"
            alt="Basic Math Sticker"/>
      );
    } else if (badge === MATH_NINJA) {
      return (
        <img
            className="Badge"
            src="/images/sticker_1.jpg"
            alt="Math Ninja Sticker"/>
      )
    } else if (badge === INTEGRAL) {
      return (
        <img
            className="Badge"
            src="/images/sticker_3.jpg"
            alt="Integral Math Sticker"/>
      );
    } else if (badge === MATH_AWESOME) {
      return (
        <img
            className="Badge"
            src="/images/sticker_2.jpeg"
            alt="Awesome Math Sticker"/>
      );
    } else if (badge === NUMBER_ONE) {
      return (
        <img
            className="Badge"
            src="/images/sticker_5.jpg"
            alt="Number One Sticker"/>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="Badge-Wrapper">
        {this.renderBadge()}
      </div>
    );
  }
}
