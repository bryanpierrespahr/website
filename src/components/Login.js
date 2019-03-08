import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import API from '../utils/api';

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
            <div className="container">
                <div className="row" id="pwd-container">
                    <div className="col-md-3"/>
                    <div className="col-md-6">
                        <section className="login-form">
                            <form role="login">
                                <img src={require("../assets/moodle-logo.png")} width="180" className="img-responsive"
                                     alt="logo"/>
                                <input type="email" name="email" id="email" placeholder="Email" required
                                       className="form-control input-lg" value={this.state.email}
                                       onChange={this.handleChange}/>

                                <input type="password" className="form-control input-lg" id="password" name="password"
                                       placeholder="Password" required
                                       value={this.state.password}
                                       onChange={this.handleChange}
                                />

                                <div className="pwstrength_viewport_progress"/>

                                <button className="btn btn-lg btn-custom btn-block"
                                        onClick={this.send}>Sign in
                                </button>
                                <div>
                                    Don't have an account yet ? <a className="customLogin" href="/signup">Sign up
                                    now </a>
                                </div>
                            </form>
                        </section>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        )
    }
}