import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import { DashboardPage } from "../dashboard";
import { GamePage } from "../game";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/app"
            component={DashboardPage} />
          <Route
            exact
            path="/game"
            component={GamePage} />
          <Redirect from="*" to="/app" />
        </Switch>
      </div>
    );
  }
}

export default App;
