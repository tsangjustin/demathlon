import React, { Component } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import { DashboardPage } from "../dashboard";
import { GamePage } from "../game";
import { LandingPage } from "../landing";
import { LoginPage } from "../login";
import { SignUpPage } from "../signup";
import { firebase } from "../firebase";

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null
        };
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.setState({
                    email: authUser.email,
                    uid: authUser.uid,
                    name: authUser.displayName,
                    lastLoginTime: authUser.metadata.lastSignInTime,
                    fullAuthUser: authUser
                });
            } else {
                this.setState({
                    email: null,
                    uid: null,
                    name: null,
                    lastLoginTime: null,
                    fullAuthUser: null
                }, () => {
                    console.log(this.state);
                });
            }
        });
    }

    render() {
        return (
            <div className="App">
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={ LandingPage } />
                    <PrivateRoute
                        exact
                        path="/app"
                        authUser={this.state.fullAuthUser}
                        component={DashboardPage} />
                    <Route
                        exact
                        path="/login"
                        component={LoginPage} />
                    <Route 
                        exact 
                        path="/signup"
                        component={SignUpPage} />
                    <PrivateRoute
                        exact
                        path="/game"
                        authUser={this.state.fullAuthUser}
                        component={GamePage} />
                    <PrivateRoute
                        exact
                        path="/game/:game_type"
                        authUser={this.state.fullAuthUser}
                        component={GamePage} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        );
    }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    firebase.isAuthenticated() === true
      ? <Component {...props} {...rest}/>
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

export default App;
