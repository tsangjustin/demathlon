import React, { Component } from "react";

import "./choice.css"

export class Choice extends Component {
  constructor(props) {
    super(props);
    this.renderShape = this.renderShape.bind(this);
  }

  renderShape() {
    const { color, shape, value } = this.props;
    let shapeStyle = {};
    var isImage = typeof(value) === "string" && value.match(/img/g);
    if (!isImage) {
      if (shape === "Triangle" || shape === "Trapezoid") {
        shapeStyle = {
          borderBottomColor: color,
        };
      } else {
        shapeStyle = {
          backgroundColor: color,
        };
      }
    }
    return (
      <div
          className={`Shape ${!isImage && shape}`}
          style={shapeStyle}>
      </div>
    );
  }

  render() {
    const { onClick, value } = this.props;
    var isImage = typeof(value) === "string" && value.match(/img/g);
    if (isImage) {
      return (
        <div
            className="Choice pointer"
            onClick={onClick}
            dangerouslySetInnerHTML={isImage && { __html: value }} />
      );
    } else {
      return (
        <div
            className="Choice pointer"
            onClick={onClick}>
            {this.renderShape()}
            <p className="Choice-Text" dangerouslySetInnerHTML={{ __html: value }}></p>
        </div>
      );
    }
  }
}