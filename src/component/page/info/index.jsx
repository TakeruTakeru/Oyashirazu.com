import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div id="home-component">
        <div className="home-head">
          <div className="home-welcome">
            <p>welcome to our website!</p>
            <p>毎月1回レジャーやスポーツなどをする何かの組織です。</p>
            <p>もしあなたが私たちの同期であればいつでも参加することができます。
              この組織は原則鎖国状態なのでも、しあなたが私の同期でなければ今すぐココ->
              <button
                style={{ height: "10px", width: "10px", background: "#000" }}
                onClick={() => window.open("about:blank", "_self").close()}
              />
            </p>
            <p>をクリックしてね＼＼\\٩( 'ω' )و //／／</p>
          </div>
          <div className="images">
            <img className="home-image" src="./static/snow_mountain.jpeg" alt="mountain"/>
          </div>
          {/* <div className="home-head-image" /> */}
          <h4 className="slogan">I'm Loving it!</h4>
        </div>
        <div className="home-content">
          <p className="home-description">
            Have you ever used HTML? Manipulated the DOM using JavaScript?
            Perfect – then you know how GoldenLayout works. GoldenLayouts are
            created out of JSON config (think HTML) that looks like this:
          </p>
        </div>
      </div>
    );
  }
}
