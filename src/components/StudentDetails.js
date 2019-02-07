import React, {Component} from 'react';
import {NotificationManager, NotificationContainer} from "react-notifications";
import {SelectGroup, TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import validator from 'validator';
import TimeRange from 'react-time-range';
import {Redirect} from 'react-router-dom';
import API from "../utils/api";

class StudentDetails extends Component {

    // //Save the modifications and update the courses info with the API via a POST request
    // saveModification = (e) => {
    //
    //     e.preventDefault();
    //
    //     var student = {
    //         number: this.state.number,
    //         firstName: this.state.firstName,
    //         lastName: this.state.lastName,
    //         email: this.state.email,
    //         password: this.state.password
    //
    //     }
    //
    //     API.patchStudent(this.props.location.param1, student) .then(() => {
    //         window.location = "/students"
    //     })
    //
    // }

    // //Called when the "Cancel" button is pressed, redirect to the previous /courses URL
    // backToStudents = () => {
    //
    //     this.props.history.push('/students');
    //
    // }


    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }

    //Used to get data from the API via HTTP GET Request
    componentDidMount() {

        API.getStudent(this.props.location.studentId)
            .then((data) => {

                var student = data.data;

                this.setState({
                    student: student
                })
            })
            .then(() => {
                this.setState({
                    ready: true
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //Render method
    render() {

        //Check if redirect state is true
        if (!this.state.ready) {
            //Redirect to the customers page
            return (<div></div>);
        } else {
            return (

                <div>
                    <div className="col-md-6 mx-auto">
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="firstName" className="float-left">First name</label>
                                <TextInput name="firstName" id="firstName"
                                           value={this.state.student.firstName}
                                />
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="lastName" className="float-left">Last name</label>
                                <p name="firstName" id="firstName"
                                   value={this.state.student.lastName}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-5 mx-auto">
                                <label htmlFor="number" className="float-left">Number</label>
                                <p name="firstName" id="firstName"
                                   value={this.state.student.number}
                                />
                            </div>
                            <div className="form-group col-md-7 mx-auto">
                                <label htmlFor="email" className="float-left">Email</label>
                                <div name="firstName" id="firstName"
                                   value={this.state.student.email}
                                />
                            </div>

                        </div>
                        <div className="col-md-10 mx-auto">
                            <button onClick={this.backToStudents} className="btn btn-danger" style={{
                                margin: '1%'
                            }}>Cancel
                            </button>
                            <button type="submit" className="btn btn-success" style={{
                                margin: '1%'
                            }}>Save
                            </button>
                        </div>
                    </div>
                    <NotificationContainer/>
                </div>
            )
        }
    }
}

export default StudentDetails;


