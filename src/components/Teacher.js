import React, {Component} from 'react';
import {NotificationManager, NotificationContainer} from "react-notifications";
import {SelectGroup, TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import validator from 'validator';
import TimeRange from 'react-time-range';
import {Redirect} from 'react-router-dom';
import API from "../utils/api";

//Component class that renders a form to edit a teacher info using 'bootstrap4-form-validation'
class Teacher extends Component {

    //Save the modifications and update the courses info with the API via a POST request
    saveModification = (e) => {

        e.preventDefault();

        var teacher = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }

        API.patchTeacher(this.props.location.param1, teacher)
            .then(() => {
                window.location = "/teachers"
            })

    }

    //Called when the "Cancel" button is pressed, redirect to the previous /teachers URL
    backToTeachers = () => {

        this.props.history.push('/teachers');

    }

    //Handle the change on input fields
    inputChanged = (event) => {
        //Set the new value to the appropriate state
        this.setState({[event.target.name]: event.target.value})
    }

    //Alert the user if there is any input errors
    handleErrorSubmit = (e, formData, errorInputs) => {
        console.error(errorInputs);
        NotificationManager.error("Error with the values entered, please try again");
    }

    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            redirect: false,
        }
    }

    //Used to get data from the API via HTTP GET Request
    componentDidMount() {

        API.getTeacher(this.props.location.param1)
            .then((data) => {

                var teacher = data.data;

                this.setState({
                    firstName: teacher.firstName,
                    lastName: teacher.lastName,
                    email: teacher.email,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //Render method
    render() {

        //Check if redirect state is true
        if (this.state.redirect) {
            //Redirect to the customers page
            return (<Redirect to='/students'/>);
        } else {
            return (
                //Return the form
                <ValidationForm onSubmit={this.saveModification} onErrorSubmit={this.handleErrorSubmit}
                                action="/teachers">
                    <div className="col-md-6 mx-auto">
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="firstName" className="float-left">First name</label>
                                <TextInput readOnly name="firstName" className="form-control" id="firstName"
                                           value={this.state.firstName}
                                />
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="lastName" className="float-left">Last name</label>
                                <TextInput readOnly className="form-control" id="code"
                                           name="lastName" value={this.state.lastName}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-7 mx-auto">
                                <label htmlFor="email" className="float-left">Email</label>
                                <TextInput readOnly name="email" className="form-control" id="email"
                                           value={this.state.email}
                                />
                            </div>
                            <div className="form-group col-md-5 mx-auto">
                            </div>
                        </div>

                    </div>
                    <NotificationContainer/>
                </ValidationForm>
            )
        }
    }
}

export default Teacher;


