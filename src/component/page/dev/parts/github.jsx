import React, { Component } from "react";
import axios from 'axios';
import { inject, observer } from "mobx-react";
import Loading from "../../../Loading";


// example of REST by using axio
class Github extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userDatas: [],
        }
        // this.props.store.uiState.onLoading = true;
    }

    componentDidMount() {
      this.props.store.uiState.onLoading = true;
        setTimeout(() => this.props.store.uiState.onLoading = false, 3000)    
    }

    componentWillMount() {
      console.log(this.props.store.uiState)
        this.props.store.uiState.onLoading = true;
        const request = axios.create({
            baseURL: 'https://api.github.com'
          })
          request.get('/users/TakeruTakeru')
            .then(res => {
              this.setState({
                userDatas: res.data
              });
            })
          this.props.store.uiState.onLoading = false;
    }


  render() {
    const {onLoading} = this.props.store.uiState;
    if (onLoading) return <Loading></Loading>

    const { userDatas } = this.state;

    return (
      <div>
          {userDatas.avatar_url}
      </div>
    );
  }
}

export default inject('store')(observer(Github));