import React, { Component } from 'react';

import { DashboardPage } from "../dashboard";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <DashboardPage />
        </div>
      </div>
    );
  }
}

export default App;
