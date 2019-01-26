import React, {Component} from 'react';
import {SelectGroup, TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import {NotificationManager, NotificationContainer} from "react-notifications";
import {Redirect} from 'react-router-dom';
import TimeRange from 'react-time-range';
import moment from 'moment';
import API from "../utils/api";

//Component class to add a new link
class AddLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }

    componentDidMount() {


    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="text-left weekContent">
                            <MdAdd></MdAdd>
                            <Link to={"/" + this.props.type + "/add"}>
                                Add a {this.props.type}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AddLink;


