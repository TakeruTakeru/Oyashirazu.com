import React, { Component } from "react";
import { inject, observer } from "mobx-react";

class LoadingMask extends Component {
  render() {
    return (
      <div className="load-wrapper">
        <div class="loader">
          <span>Loading</span>
        </div>
      </div>
    );
  }
}

export default inject("store")(observer(LoadingMask));
