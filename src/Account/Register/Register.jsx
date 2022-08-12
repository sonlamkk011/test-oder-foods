import { Alert, Button, ButtonBase, ButtonGroup, Stack } from "@mui/material";
import { Error } from "Account/Components/Error";
import { Form } from "Account/Components/Form";
import authService from "Account/Components/Services/AuthService";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Register.scss";

export class Register extends Form {
    constructor(props) {
        super(props);
        this.state = {
            form: this._getInitFormData({
                username: "",
                phone: "",
                email: "",
                password: "",
            }),
            message: {
                type: "",
                content: "",
                isDisplay: false,
            }
        }
    }

    handleRegister = async () => {
        this._validateForm();
        if (this._isFormValid()) {
            const { username, email, phone, password } = this.state.form;
            const data = {
                username: username.value,
                phone: phone.value,
                email: email.value,
                password: password.value,
            }
            await authService.registerAccount(data)
                .then((res) => {
                    let { message } = this.state;
                    message.isDisplay = true;
                    message.type = "success";
                    message.content = "Create new account successful";
                    this.setState({
                        message
                    });
                })
                .catch((err) => {
                    let { message } = this.state;
                    message.isDisplay = true;
                    message.type = "error";
                    message.content = "Please review your registration information";
                    this.setState({
                        message
                    });
                })
        }
    }



    render() {
        const { message } = this.state;
        const { username, email, phone, password } = this.state.form;
        return (
            <>
                <div id="login-box">

                    {
                        message.isDisplay ? (<Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity={message.type}> {message.content}
                            </Alert>
                        </Stack>
                        ) : (
                            ""
                        )}


                    <div className="left">
                        <input type="text" name="username" placeholder="Username" required value={username.value} onChange={(ev) => this._setValue(ev, "username")} />
                        {
                            username.err !== '' ? username.err === "*" ? <Error message="User Name cannot be empty" /> : '' : ""
                        }
                        <input type="text" name="email" placeholder="Email" required value={email.value} onChange={(ev) => this._setValue(ev, "email")} />
                        {
                            email.err !== '' ? email.err === "*" ? <Error message="Email cannot be empty" /> : '' : ""
                        }
                        <input type="text" name="phone" placeholder="Phone" required value={phone.value} onChange={(ev) => this._setValue(ev, "phone")} />
                        {
                            phone.err !== '' ? phone.err === "*" ? <Error message="Phone cannot be empty" /> : '' : ""
                        }
                        <input type="password" name="password" placeholder="Password" required value={password.value} onChange={(ev) => this._setValue(ev, "password")} />
                        {
                            password.err !== '' ? password.err === "*" ? <Error message="Password cannot be empty" /> : '' : ""
                        }
                        <div>
                            <Link to="/account-login" style={{color: "black" }} >
                                Do you already have an account? LogIn
                            </Link>
                        </div>
                        <div>

                            <Button style={{ marginTop: 20 }} type="submit" variant="contained" onClick={this.handleRegister} name="button-sutmit"> Register</Button>
                        </div>

                    </div>

                    <div className="right">

                    </div>

                </div>


            </>
        )
    }
}