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
                if(data.token != null){
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('id', data.user._id);
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
            <div className="Login">
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <Button
                    onClick={this.send}
                    block
                    bsSize="large"
                    type="submit"
                >
                    Connexion
                </Button>
            </div>
        )
    }
}