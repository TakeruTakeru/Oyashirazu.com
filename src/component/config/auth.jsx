import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom"
import { inject, observer } from "mobx-react";

// import AuthService from './services/AuthService'  // ログインチェックを行うサービス.

class PrivateRoute extends Component {

  render() {
    const { user } = this.props.store.userState;

    // ルーティング情報を取得.
    const { component : Component, ...rest } = this.props

    // ログインチェック後はルーティング処理を行う.
    return (
      <Route {...rest} render={() => {
        // 未ログインなら、ログイン画面にリダイレクト.
        if (user.isLogin) {
          return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
        }
        // ログイン済なら、指定されたコンポーネントを表示.
        return <Component {...this.props} />
      }}
      />
    )
  }
}

export default inject('store')(observer(PrivateRoute))