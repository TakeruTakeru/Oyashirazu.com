import React, { Component } from "react";

export default class DeveloperDocument extends Component {
  render() {
    return (
      <div className="container">
        <div id="document">
          <h2>Sample Document</h2>
          <div className="content">
            <h3>目次</h3>
            <ul className="document-list">
              <li>
                <a href="#setup">環境構築</a>
              </li>
              <li>
                <a href="#react">React</a>
              </li>
              <li>
                <a href="#sass">SASS</a>
              </li>
              <li>
                <a href="#git">git</a>
              </li>
              <li>
                <a href="#firebase">firebase</a>
              </li>
            </ul>
          </div>
          <div className="content">
            <h3>
              <a href="#setup" name="#setup">環境構築</a>
            </h3>
            <p>この章では環境構築を行います。</p>
            <h3>gitのインストール</h3>
            <p>
              分散型バージョン管理ツールです。慣れるまで時間がかかりますが、
              慣れると感謝の感情が湧いてくるのでそれまで頑張りましょう。
              手動バックアップはナウくないです。なんか法律とかもgit管理してたりしなかったりとか。
            </p>
            <p>
              基本的に
              <a
                href="https://qiita.com/toshi-click/items/dcf3dd48fdc74c91b409"
                target="_blank"
                rel="noopener noreferrer"
              >
                この通り
              </a>
              やっていただければ多分上手くいきます。
            </p>
            <h3>Node.jsのインストール</h3>
            node.jsはサーバサイドのjavascript実行環境です。
            これに付随しているnpmというパッケージ管理ツールを使うためにインストールします。
            フロントエンドと呼ばれる人で使わない人はいないはずです。
            <p>
              基本的に
              <a
                href="https://qiita.com/taiponrock/items/9001ae194571feb63a5e"
                target="_blank"
                rel="noopener noreferrer"
              >
                この通り
              </a>
              やっていただければ多分上手くいきます。
            </p>
            <h3>ローカルリポジトリの作成</h3>
            <p className="limited-repository-warning">
              まずはgitのリモートリポジトリからurlをコピーします。
              urlの横のボタンを押すとコピーされます。
            </p>
            <div className="text-align-center">
              <img alt="img" src="../static/github-min.png" />
            </div>
            <p className="limited-repository-warning">
              コピーしたら、開発用のディレクトリ直下に以下のように実行して下さい。(git
              clone [url])
            </p>
            <div className="text-align-center">
              <img alt="img" src="../static/console-min.png" />
            </div>
            <h3><a href="#react" name="react">React</a></h3>
            <div className="text-align-center" />
            <div className="text-align-center">作成中...</div>
            <h3><a href="#sass" name="sass">Saas</a></h3>
            <div className="text-align-center" />
            <div className="text-align-center">作成中...</div>
            <h3><a href="#git" name="git">Git</a></h3>
            <div className="text-align-center" />
            <div className="text-align-center">作成中...</div>
          </div>
        </div>
      </div>
    );
  }
}
