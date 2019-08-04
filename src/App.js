import React, { Component } from "react";
import InputAmount from "./components/InputAmount";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="amount-parser__wrapper">
        <div className="amount-parser__box">
          <InputAmount />
        </div>
      </div>
    );
  }
}

export default App;
