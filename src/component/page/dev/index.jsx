import React, { Component } from "react";
import SampleDocument from "./parts/sample-document";
import Github from "./parts/github";
import { Route, Link } from 'react-router-dom';

export default class DeveloperDocument extends Component {
  render() {
    return (
        <div>
        <Route exact path="/dev" component={devHome} />
        <Route path="/dev/sample" component={SampleDocument} />
        <Route path="/dev/github" component={Github} />
        </div>
    );
  }
}

class devHome extends Component {
    render() {
        return (
            <div className="container">
            <div id="document">
              <div className="content">
                <h2>developers document</h2>
                <p>まず開発にあたって使用している技術です。</p>
                <ul className="document-list">
                  <li>
                    <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                      React
                    </a>
                    <span className="note">フロンエンドライブラリ。JavaScript。</span>
                  </li>
                  <li>
                    <a href="https://sass-lang.com/" target="_blank" rel="noopener noreferrer">
                      SASS
                    </a>
                    <span className="note">フロンエンドライブラリ。css拡張言語。</span>
                  </li>
                  <li>
                    <a href="https://firebase.google.com/?hl=ja" target="_blank" rel="noopener noreferrer">
                      firebase
                    </a>
                    <span className="note">mBaaS(mobile Backend as a Service)。JavaScript。</span>
                  </li>
                  <li>
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                      git(github)
                    </a>
                    <span className="note">ご存知ドキュメント管理ツール。</span>
                  </li>
                  <li>
                    <a href="https://www.tornadoweb.org/en/stable/" target="_blank" rel="noopener noreferrer">
                      tornade(予定)
                    </a>
                    <span className="note">web framework(サーバサイド)。python。</span>
                  </li>
                </ul>
                <div className="action-button-wrapper">
                <Link to="/dev/sample">>>サンプルドキュメントを見る</Link>
                    <button className="action-button" ></button>
                </div>
                <div className="action-button-wrapper">
                <Link to="/dev/github">>>github</Link>
                    <button className="action-button" ></button>
                </div>
              </div>
              <div className="content">
                <h3>このプロジェクトの目的</h3>
                <p>
                  基本的にお勉強兼開発欲求を満たす目的です。なので特に納期ガーとか仕様ガーとか細かいことは気にしない方針です。
                </p>
                <p>
                  2/8日現在、漆原がダラダラしたため運用方針など諸々が決まっていませんがとりあえずみんながいじれる環境にはしてます。
                </p>
                <p>
                  現在のステージとしてはとりあえずサイトの画面仕様とかデザインとかを探っているところです。
                </p>
                <p>
                  ようやく自分の方である程度できるレベルまで来たのでこれらの技術とかを共有していけたらみたいなのも一応目的です。
                </p>
                <p>
                  もちろん提案や指摘等もお待ちしています。自信家の僕ですら、デザインに関して全く自信がないのでそこは特に期待してます。
                </p>
                <p>
                  だらだら書き連ねましたが要は適当にみんなで開発が目的です。よければプルリク飛ばしてくれると嬉しいです。相談にも乗るスタンスです。
                </p>
                <div className="business-card">
                    <div className="name">
                    Urushihara Takeru
                    </div>
                    <div className="twitter">
                        <a href="https://twitter.com/iamtakeruXO">@iamtakeruXO</a>
                    </div>
                    <div className="birth">
                        1996/2/19 満22才
                    </div>
                </div>
              </div>
              <div className="content">
                <h3>2/8~の目標</h3>
                <ul className="document-list">
                  <li>ホーム画面の実装</li>
                  <li>firebaseの認証機能実装</li>
                  <li>参加メンバーのキャッチアップ補助</li>
                  <li>運用方法の見直し</li>
                  <li>git flow見直し</li>
                  <li>tornadeの調査</li>
                </ul>
              </div>
            </div>
          </div>
        )
    }
}