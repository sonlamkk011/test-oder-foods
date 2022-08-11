import React, { Component } from "react";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }
    render() {
        const { username, password } = this.state;
        return (
            <>
                <>
                    <div id="back">
                        <div className="backRight" />
                        <div className="backLeft" />
                    </div>
                    <div id="slideBox">
                        <div className="topLayer">
                            <div className="left">
                                <div className="content">
                                    <h2>Sign Up</h2>
                                    <form method="post" onsubmit="return false;">
                                        <div className="form-group">
                                            <input type="text" placeholder="username" />
                                        </div>
                                        <div className="form-group" />
                                        <div className="form-group" />
                                        <div className="form-group" />
                                    </form>
                                    <button id="goLeft" className="off">
                                        Login
                                    </button>
                                    <button>Sign up</button>
                                </div>
                            </div>
                            <div className="right">
                                <div className="content">
                                    <h2>Login</h2>
                                    <form method="post" onsubmit="return false;">
                                        <div className="form-group">
                                            <label htmlFor="username" className="form-label">
                                                Username
                                            </label>
                                            <input type="text" />
                                        </div>
                                        <button id="goRight" className="off">
                                            Sign Up
                                        </button>
                                        <button id="login" type="submit">
                                            Login
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            </>
        )
    }
}
