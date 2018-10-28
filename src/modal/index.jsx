import React, { Component } from "react";

import "./modal.css"

export class Modal extends Component {
  render() {
    const { handleClose, showModal } = this.props;
    return (
      <div
          className="overlay"
          style={{width: showModal ? "100%" : "0%"}}
          onClick={handleClose}>
        <p
            className="closebtn"
            onClick={handleClose}>
          &times;
        </p>
        <div className="overlay-content">
          <p>Sticker Store</p>
        </div>
      </div>
    );
  }
}