import React from 'react';
import API from '../utils/api';

export class SignUp extends React.Component {


    send = (event) => {

        if (this.state.email.length === 0) {
            return;
        }
        if (this.state.password.length === 0 || this.state.password !== this.state.cpassword) {
            return;
        }

        var _send = {
            email: this.state.email,
            password: this.state.password,
            role: "teacher",
        }

        var teacher = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email
        }

        API.signup(_send)
            .then(res => res.json())
            .then(data => {
                sessionStorage.setItem('token', data.token);
                API.postTeacher(teacher).then(() => {
                    window.location = "/dashboard"
                })

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
            firstname:"",
            lastname:"",
            email: "",
            password: "",
            cpassword: ""
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

                                <input type="text" name="firstname" id="firstname" placeholder="First name" required
                                       className="form-control input-lg" value={this.state.firstname}
                                       onChange={this.handleChange}/>

                                <input type="text" name="lastname" id="lastname" placeholder="Last name" required
                                       className="form-control input-lg" value={this.state.lastname}
                                       onChange={this.handleChange}/>

                                <input type="email" name="email" id="email" placeholder="Email" required
                                       className="form-control input-lg" value={this.state.email}
                                       onChange={this.handleChange}/>

                                <input type="password" className="form-control input-lg" id="password" name="password"
                                       placeholder="Password" required
                                       value={this.state.password}
                                       onChange={this.handleChange}
                                />

                                <input type="password" className="form-control input-lg" id="cpassword" name="cpassword"
                                       placeholder="Confirm password" required
                                       value={this.state.cpassword}
                                       onChange={this.handleChange}
                                />


                                <div className="pwstrength_viewport_progress"/>

                                <button className="btn btn-lg btn-custom btn-block"
                                        onClick={this.send}>Sign up
                                </button>
                            </form>
                        </section>
                    </div>
                    <div className="col-md-3"/>
                </div>
            </div>

        )
    }
}