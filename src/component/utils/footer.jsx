import React, { Component } from "react";

export default class FooterComponent extends Component {
  render() {
    return (
      <div id="footer-component">
        <div className="footer-wrapper">
        <ul>
            <li><button className="footer-btn">contact</button></li>
            <li><button className="footer-btn">human resorces</button></li>
            <li><button className="footer-btn">address</button></li>
            <li><button className="footer-btn">etc</button></li>
        </ul>
        <h3 className="site-right">
        <span>2019 Urushihara Takeru all rights reserved.</span>
        </h3>
        </div>
      </div>
    );
  }
}
