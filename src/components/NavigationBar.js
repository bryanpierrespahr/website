import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//Navigation bar component that is always rendered (on every page)
class NavigationBar extends Component {

    isAuthenticated = () => {

        if(sessionStorage.getItem('token') != null)
            return true
        else
            return false
    }

    //Called when the user click on the sign out link
    signOut = () => {

    }

    //Constructor
    constructor(props) {
        super(props);
        this.state = {token : ''}
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
                        <img src={require("../assets/temp.png")} width="100" alt="logo"/>
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
                                <Link className="nav-link" to="/signup">My account</Link>
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
                        <img src={require("../assets/temp.png")} width="100" alt="logo"/>
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

