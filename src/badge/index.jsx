import React, { Component } from "react";

import {
  BASIC_MATH,
  MATH_NINJA,
  INTEGRAL,
  MATH_AWESOME,
  NUMBER_ONE,
  BLUE_TRIANGLE,
  ANGLE,
  YUP,
  CORRECT,
  CONGRATS,
  AWESOME,
  GREEN,
  BANANA,
  PIKACHU,
  CHECK,
  THUMBS_UP,
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
    } else if (badge === BLUE_TRIANGLE) {
      return (
        <img
            className="Badge"
            src="/images/sticker_6.jpg"
            alt="Triangle Sticker"/>
      );
    } else if (badge === ANGLE) {
      return (
        <img
            className="Badge"
            src="/images/sticker_7.jpg"
            alt="Angle Sticker"/>
      );
    } else if (badge === YUP) {
      return (
        <img
            className="Badge"
            src="/images/animation/yup.gif"
            alt="Yup Gif"/>
      );
     } else if (badge === CORRECT) {
      return (
        <img
            className="Badge"
            src="/images/correct.jpg"
            alt="Correct Sticker"/>
      );
    } else if (badge === CONGRATS) {
      return (
        <img
            className="Badge"
            src="/images/animation/congrats.gif"
            alt="Congrats Gif"/>
      );
    } else if (badge === AWESOME) {
      return (
        <img
            className="Badge"
            src="/images/animation/awesome.gif"
            alt="Awesome Gif"/>
      );
    } else if (badge === GREEN) {
      return (
        <img
            className="Badge"
            src="/images/animation/green.gif"
            alt="Green Hand Gif"/>
      );
    } else if (badge === BANANA) {
      return (
        <img
            className="Badge"
            src="/images/animation/banana.gif"
            alt="Banana Gif"/>
      );
    } else if (badge === PIKACHU) {
      return (
        <img
            className="Badge"
            src="/images/animation/pikachu.gif"
            alt="PIKACHU Gif"/>
      );
    } else if (badge === CHECK) {
      return (
        <img
            className="Badge"
            src="/images/animation/check.gif"
            alt="Check Gif"/>
      );
    } else if (badge === THUMBS_UP) {
      return (
        <img
            className="Badge"
            src="/images/animation/thumbs_up.gif"
            alt="thumbs_up Gif"/>
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
