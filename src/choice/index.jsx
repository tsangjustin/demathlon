import React, { Component } from "react";

import "./choice.css"

export class Choice extends Component {
  constructor(props) {
    super(props);
    this.renderShape = this.renderShape.bind(this);
  }

  renderShape() {
    const { color, shape } = this.props;
    let shapeStyle = {};
    if (shape === "Triangle" || shape === "Trapezoid") {
      shapeStyle = {
        borderBottomColor: color,
      };
    } else {
      shapeStyle = {
        backgroundColor: color,
      };
    }
    return (
      <div
          className={`Shape ${shape}`}
          style={shapeStyle}>
      </div>
    );
  }

  render() {
    const { color, onClick, shape, value } = this.props;
    return (
      <div
          className="Choice"
          onClick={onClick}>
        {this.renderShape()}
          <p className="Choice-Text" dangerouslySetInnerHTML={{ __html: value }}></p>
      </div>
    );
  }
}