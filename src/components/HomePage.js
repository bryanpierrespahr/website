import React from 'react';
import { Button } from "react-bootstrap";
import API from '../utils/api';
import LoginForm from "./LoginForm";

export class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.disconnect.bind(this);
    }

    isAuthenticated = () => {

        if (sessionStorage.getItem('token') != null)
            return true
        else
            return false
    }

    disconnect = event => {
        API.logout();
        window.location = "/";
    }

    render() {

        if(this.isAuthenticated()){
            return(
                <div className="container">
                    <img alt="Haaga-Helia logo" src={require("../assets/hh.png")}
                         height="150px"/>

                </div>
            )
        }else{
            return(
                <div className="container">
                    <img alt="Haaga-Helia logo" src={require("../assets/hh.png")}
                         height="150px"/>
                    <LoginForm/>
                </div>
            )
        }

    }
}