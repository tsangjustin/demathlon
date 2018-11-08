import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class LandingPage extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to Demathlon</h1>
                <p>Demathlon is an application to learn math</p>
                <p>Get started by <Link to='/signup'>Creating an Account</Link> or <Link to='/login'>Logging In</Link></p>
            </div>
        );
    }
}
