import React from 'react';
import { Button } from "react-bootstrap";

import API from '../utils/api';
import MyCourses from "./MyCourses";

export class Dashboard extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className="Dashboard">
                <h1>Dashboard</h1>
                <MyCourses/>
            </div>
        )
    }
}