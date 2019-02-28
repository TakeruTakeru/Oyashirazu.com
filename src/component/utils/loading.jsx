import { Icon } from 'antd';
import React, { Component } from "react";

export default class loading extends Component {
    render() {
        return (
            <div className="loading">
                <Icon type="loading"></Icon>
            </div>
        )
    }
}