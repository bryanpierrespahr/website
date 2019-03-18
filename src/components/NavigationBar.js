import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import API from "../utils/api";

//Navigation bar component that is always rendered (on every page)
class NavigationBar extends Component {

    isAuthenticated = () => {

        if (sessionStorage.getItem('token') != null)
            return true
        else
            return false
    }

    //Called when the user click on the sign out link
    signOut = () => {

        API.logout();
        window.location = "/";

    }

    //Constructor
    constructor(props) {
        super(props);
        this.state = {token: ''}
    }

    //Method called immediately after the component is mounted
    componentDidMount() {

    }

    //Render method
    render() {

        if (this.isAuthenticated()) {
            //If the user is authenticated, renders a different navigation bar
            return (
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link className="navbar-brand" to="/">
                        <img src={require("../assets/hh-logo.JPG")} width="120" alt="logo"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/courses">Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/students">Students</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/teachers">Teachers</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <div className="dropdown">
                                    <button className="btn btn-custom dropdown-toggle" type="button"
                                            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                        My account
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button type="button" className="dropdown-item" onClick={this.signOut} >Log out</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            )

        } else {
            //If the user is not authenticated, renders a different navigation bar
            return (
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link className="navbar-brand" to="/">
                        <img src={require("../assets/hh-logo.JPG")} width="120" alt="logo"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/courses">Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/students">Students</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/teachers">Teachers</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Log in</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">Sign up</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            );
        }
    }

}

export default NavigationBar;

