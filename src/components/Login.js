import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import API from '../utils/api';
import LoginForm from "./LoginForm";

export class Login extends React.Component {

    send = (event) => {

        if (this.state.email.length === 0) {
            return;
        }
        if (this.state.password.length === 0) {
            return;
        }

        var _send = {
            email: this.state.email,
            password: this.state.password
        }

        API.login(_send)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.token != null) {
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('id', data.user._id);
                    sessionStorage.setItem('role',data.user.role)

                    if (data.user.role == "teacher") {
                        API.getTeacherByEmail(this.state.email)
                            .then((data) => {
                                sessionStorage.setItem('teacherId', data.data._id);
                            })
                    }
                    window.location = "/dashboard"
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }

    handleChange = event => {

        this.setState({
            [event.target.id]: event.target.value
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }

        this.handleChange.bind(this);
        this.send.bind(this);
    }

    render() {

        return (
            <div>
                <div className="paddingTop20"/>
                <LoginForm/>
            </div>


        )
    }
}