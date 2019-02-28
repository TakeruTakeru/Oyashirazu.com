import React, { Component } from "react";
import axios from 'axios';


// example of REST by using axios
export default class Github extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userDatas: [],
        }
    } 

    componentWillMount() {
        const request = axios.create({
            baseURL: 'https://api.github.com'
          })
          request.get('/users/TakeruTakeru')
            .then(res => {
              this.setState({
                userDatas: res.data
              });
              console.log(res);
            })
    }


  render() {

    const { userDatas } = this.state;

    return (
      <div>
          {userDatas.avatar_url}
      </div>
    );
  }
}
