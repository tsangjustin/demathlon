import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./landing.css";

export class LandingPage extends Component {
    render() {
        return (
            <div className="Landing-Page">
                <header>
                    <h1>Welcome to Demathlon</h1>
                </header>
                <div className="Landing-Container">
                    <div className="Landing-Box-Section">
                        <p>Demathlon is an application to learn math</p>
                        <p>
                            We are a website dedicate to your kid's math education.
                        </p>
                    </div>
                    <div className="Landing-Box-Section">
                        <p>New to DeMathlon?</p>
                        <Link to='/signup'>
                            <button className="btn Landing-Btn">
                                <p className="SignUp Landing-Button-Text">Create an Account</p>
                            </button>
                        </Link>
                        <p>Or welcome back!</p>
                        <Link to='/login'>
                            <button className="btn Landing-Btn">
                                <p className="SignUp Landing-Button-Text">Log In</p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
