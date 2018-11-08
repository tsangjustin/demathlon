import React, { Component } from 'react';

import { auth } from '../firebase';

export class SignOutButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        auth.doSignOut();
    }

    render() {
        return (
            <button
                type="button"
                onClick={this.onClick}
            >
                Sign Out
            </button>
        );
    }
}
