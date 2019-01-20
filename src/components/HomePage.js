import React from 'react';
import { Button } from "react-bootstrap";

import API from '../utils/api';

export class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.disconnect.bind(this);
    }

    disconnect = event => {
        API.logout();
        window.location = "/";
    }

    render() {
        return(
            <div className="HomePage">
                <h1>HomePage</h1>
            </div>
        )
    }
}