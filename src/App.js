import React, { Component } from "react";
//main content
import Home from "./component/page/home";
import Dev from "./component/page/dev";
import Info from "./component/page/info";
import Library from "./component/page/library";
import Footer from "./component/utils/footer";
//setting content
import { config } from "./config";
import Login from "./component/config/login";
import PrivateRouter from "./component/config/auth";
import store from './store/Store';
import { Provider, } from 'mobx-react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import "./App.scss";
import "antd/dist/antd.css";


class App extends Component {

  onClickMenu = () => {
    this.refs.menubox.checked = false;
  };

  render() {
    return (
      <BrowserRouter>
      <Provider store={store}>
        <div>
          <div className="header">
            <div id="header-component">
              <nav className="navigation">
                <input
                  ref="menubox"
                  type="checkbox"
                  id="nav"
                  className="hidden"
                />
                <label htmlFor="nav" className="nav-btn">
                  <i />
                  <i />
                  <i />
                </label>
                <div className="logo">
                  <a href="/">{config.siteName}</a>
                </div>
                <div className="nav-wrapper" onClick={this.onClickMenu}>
                  <ul>
                    <li>
                      <Link className="nav-link" to="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/library">
                        library
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/info">
                        info
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/dev">
                        dev doc
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
            </Switch>
              <Switch>
                <PrivateRouter path="/library" component={Library} />
                <PrivateRouter path="/info" component={Info} />
                <PrivateRouter path="/dev" component={Dev} />
              </Switch>
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
        </Provider>
      </BrowserRouter>
    );
  }
}
export default App;
