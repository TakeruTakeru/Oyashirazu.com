import { Spin } from 'antd';
import React, { Component } from "react";

export default class Spiner extends Component {
    render() {
        return (
            <div className="spin">
                <Spin tip="loading"></Spin>
            </div>
        )
    }
}