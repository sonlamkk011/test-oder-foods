import React, { Component } from "react";

export class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { message } = this.props;
        return (
            <>
                <p className="text-danger" style={{ marginTop: "0.5rem", color: "red" }}>{message}</p>
            </>
        )
    }
}