import React, { Component } from "react";

import "./choice.css"

export class Choice extends Component {
  render() {
    const { color, onClick, value } = this.props;
    return (
      <div
          className="Choice"
          style={{backgroundColor: color}}
          onClick={onClick}>
        <p>{value}</p>
      </div>
    );
  }
}