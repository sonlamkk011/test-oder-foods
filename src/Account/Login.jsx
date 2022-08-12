import { Alert, Button, Stack } from "@mui/material";
import axios from "axios";
import React, { Component } from "react";
import { Error } from "./Components/Error";
import { Form } from "./Components/Form";
import authService from "./Components/Services/AuthService";
import "./Login.scss"

export class Login extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                username: "",
                password: "",
            }),
            message: {
                type: "",
                content: "",
                isDisplay: false,
            }

        }
    }


    handleSubmit = async () => {
        this._validateForm();
        if (this._isFormValid()) {
            const { username, password } = this.state.form;
            const params = new URLSearchParams();
            params.append("grant_type", "password");
            params.append("username", username.value);
            params.append("password", password.value);
            await authService.accessAuthToken(params)
                .then((res) => {
                    localStorage.setItem('access_token', res.data.access_token);
                    window.location.replace('/');
                })
                .catch((err) => {
                    let { message } = this.state;
                    message.isDisplay = true;
                    message.type = "error";
                    message.content = "Vui lòng kiểm tra lại tải khoản hoặc mật khẩu";
                    this.setState({
                        message
                    });
                });
        } else {
        }

    }



    render() {
        const { message } = this.state;
        const { username, password } = this.state.form;
        return (
            <>
                <div className="box-form">
                    <div className="left">
                    </div>
                    <div className="right">
                        <h5>Login</h5>
                        <div className="inputs">
                            <input type="text" required placeholder="User Name" onChange={(ev) => this._setValue(ev, "username")} />
                            {username.err !== "" ? (
                                username.err === "*" ? (
                                    <Error message="username cannot be empty" />
                                ) : (
                                    <Error message={username.err} />
                                )
                            ) : (
                                ""
                            )}
                            <br />
                            <input type="password" required placeholder="Password" onChange={(ev) => this._setValue(ev, "password")} />
                            {password.err !== "" ? (
                                password.err === "*" ? (
                                    <Error message="password cannot be empty" />
                                ) : (
                                    <Error message={password.err} />
                                )
                            ) : (
                                ""
                            )}
                        </div>
                        <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
                    </div>
                </div>
                <div>

                    {
                        message.isDisplay ? (<Stack sx={{ width: '20%', marginTop: -75, float: "right", marginRight: 50 }} spacing={2}>
                            <Alert severity={message.type}> {message.content}
                            </Alert>
                        </Stack>
                        ) : (
                            ""
                        )}
                </div>


            </>
        )
    }

}


