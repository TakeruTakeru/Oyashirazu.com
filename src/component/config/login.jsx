import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Spiner from '../utils/spiner';

export default class Login extends Component {
  componentDidMount() {
    //get env value
    // let appId = process.env;
  }

  render() {
    return (
      <div>
        <Route
          exact
          path="/login"
          component={inject("store")(observer(SignIn))}
        />
        <Route path="/login/register" component={SignUp} />
        <Route path="/login/logout" component={SignOut} />
      </div>
    );
  }
}

class SignIn extends Component {

  doLogin = () => {
    const id = document.getElementById("id").value;
    const pass = document.getElementById("password").value;
    //<Todo> get target path user wanted to jump.
    const targetPath = "/";
    this.props.store.userState.doLogin(id, pass).then(res => {
      !res.hasOwnProperty("_id") || this.props.history.push(targetPath);
      !res.hasOwnProperty("_errorMessage") || this._createErrorMessage(res);
    });
  };

  onPressedEnterKeyInForm = e => {
    e.which !== 13 || this.doLogin();
  };

  _createErrorMessage = ErrorModel => {
    let errorElem = document.getElementById("error-message");
    errorElem.innerText = ErrorModel.getMessage();
  };

  render() {

    const { loading } = this.props.store.userState;
    const {userState} = this.props.store;
    console.log(userState)
    const message = loading ?  <Spiner /> : undefined;

    return (
      <div id="login">
        <div className="login-wrapper">
          <h2>Login</h2>
          {message}
          <div className="error-message">
            <span id="error-message" />
          </div>
          <div className="form">
            <div className="form-id">
              <input
                onKeyPress={e => this.onPressedEnterKeyInForm(e)}
                placeholder="email"
                id="id"
                type="text"
              />
            </div>
            <div className="form-password">
              <input
                onKeyPress={e => this.onPressedEnterKeyInForm(e)}
                placeholder="password"
                id="password"
                type="password"
              />
            </div>
            <div className="form-forget-pass">
              <Link to="/login/signup">forget pass? or sign up!</Link>
            </div>
            <div className="form-submit">
              <input type="submit" onClick={this.doLogin} value="submit" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class SignOut extends Component {
  render() {
    return <div>sign out</div>;
  }
}

class SignUp extends Component {
  render() {
    return <div>sign up</div>;
  }
}
