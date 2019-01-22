import React from 'react';
import { Button } from "react-bootstrap";

import API from '../utils/api';
import MyCourses from "./MyCourses";

export class Dashboard extends React.Component {

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
            <div className="Dashboard">
                <h1>Dashboard</h1>
                <MyCourses/>
                <Button
                    onClick={this.disconnect}
                    block
                    bsSize="large"
                    type="submit"
                >
                    Se déconnecter
                </Button>
            </div>
        )
    }
}