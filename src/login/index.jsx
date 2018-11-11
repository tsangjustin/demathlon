import React, { Component } from 'react';
import { auth } from '../firebase';
import {Link} from 'react-router-dom'; 
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    handleChange = (e) => {
        let newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    async onSubmit(e) {
        e.preventDefault();

        const {
            email, 
            password
        } = this.state;

        try {
            await auth.doSignInWithEmailAndPassword(email, password);
            this.setState({...INITIAL_STATE});
            this.props.history.push('./app');
        } catch (err) {
            console.log(err.code);
            switch (err.code) {
                case "auth/user-not-found":
                    this.setState({ error: "No Account With That Email Address Found!"});
                    break;
                case "auth/wrong-password":
                    this.setState({ error: "Password Incorrect!" });
                    break;
                case "auth/invalid-email":
                    this.setState({ error: "Invalid Email Address!" });
                    break;
                default:
                    console.log(`Something else went wrong: ${e.code}`);
                    this.setState({ error: "Unkown Error!" });
                    break;
            }
        }
    }

    async socialSignOn(provider) {
        try {
            await auth.doSocialSignIn(provider);
            this.setState({...INITIAL_STATE});
            this.props.history.push('./app');
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const {
            email, 
            password,
            error
        } = this.state;

        const isInvalid = 
            password === '' || 
            email === '' ||
            password.length < 6;

        return (
            <div>
                <h1>Login</h1>
                { error && <p className="error">{error}</p> }
                <form onSubmit={this.onSubmit.bind(this)}>

                    <label htmlFor="email">Email Address:</label>
                    <div className="form-group">
                        <input
                            autoComplete='email'
                            id="email"
                            type = 'email'
                            name='email'
                            onChange={this.handleChange}
                            value ={this.state.email}
                        />
                    </div>

                    <label htmlFor="password">Password</label>
                    <div className="form-group">
                        <input
                            autoComplete ='new-password'
                            id="password"
                            type = 'password'
                            name='password'
                            onChange={this.handleChange}
                            value ={this.state.password}
                        />
                    </div>

                    <div className="form-group">
                        <button
                            type="submit"
                            disabled={isInvalid}>Submit
                        </button>
                    </div>
                    <img
                        onClick={() => this.socialSignOn("google")}
                        alt="google signin"
                        src="./images/btn_google_signin.png" />
                    <br />
                    Not Registered yet? <Link className="SignUp" to='/signup'> Click here to Register</Link>
                </form>
        </div>
        );
    }
}
