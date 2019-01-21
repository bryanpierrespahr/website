import React, {Component} from 'react';
import {SelectGroup, TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import {NotificationManager, NotificationContainer} from "react-notifications";
import {Redirect} from 'react-router-dom';
import TimeRange from 'react-time-range';
import moment from 'moment';
import API from "../utils/api";

//Component AddStudent to add a new student
class AddStudent extends Component {

    //Add the student via the API with a POST request
    addStudent = (event) => {

        //Prevent the default action
        event.preventDefault();

        const student = {
            number: this.state.number,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }

        API.postStudent(student).then(function (data) {
            window.location = "/students";
        })


    }

    //Alert the user if there is any input errors
    handleErrorSubmit = (e, formData, errorInputs) => {
        console.error(errorInputs);
        NotificationManager.error("Error with the values entered, please try again");
    }

    //Handle the change on input fields
    inputChanged = (event) => {

        console.log(event.target.name)
        console.log(event.target.value)

        //Set the new value to the appropriate state
        this.setState({[event.target.name]: event.target.value})

    }

    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: '',
            redirect: false,
        }
    }

    //Used to get data from the API via HTTP GET Request
    componentDidMount() {


    }

    //Check that the 2 passwords entered match with each other
    matchPassword = (value) => {
        return value && value === this.state.password;
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
                                action="/customers">
                    <div className="col-md-6 mx-auto">
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="firstName" className="float-left">First name</label>
                                <TextInput name="firstName" className="form-control" id="firstName"
                                           placeholder="Enter student first name"
                                           value={this.state.firstName} onChange={this.inputChanged}
                                           required
                                />
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="lastName" className="float-left">Last name</label>
                                <TextInput className="form-control" id="code" placeholder="Enter student last name"
                                           name="lastName" value={this.state.lastName} onChange={this.inputChanged}
                                           required/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-5 mx-auto">
                                <label htmlFor="number" className="float-left">Number</label>
                                <TextInput name="number" className="form-control" id="number"
                                           placeholder="Enter student number"
                                           value={this.state.number} onChange={this.inputChanged}
                                           required/>
                            </div>
                            <div className="form-group col-md-7 mx-auto">
                                <label htmlFor="email" className="float-left">Email</label>
                                <TextInput name="email" className="form-control" id="email"
                                           placeholder="Enter student email address"
                                           value={this.state.timing} onChange={this.inputChanged}
                                           required
                                />
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="password" className="float-left">Password</label>
                                <TextInput name="password" className="form-control" id="password" type="password"
                                           value={this.state.password} onChange={this.inputChanged}
                                           required
                                />
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="password2" className="float-left">Confirm password</label>
                                <TextInput name="password2" className="form-control" id="password2" type="password"
                                           value={this.state.password2} onChange={this.inputChanged}
                                           required validator={this.matchPassword}
                                           errorMessage={{
                                               required: "Confirm password is required",
                                               validator: "Password doesn't match"
                                           }}
                                />
                            </div>
                        </div>
                        <div className="col-md-10 mx-auto">
                            <button onClick={this.addStudent}
                                    name="submit" type="submit" className="btn btn-primary">Add student
                            </button>
                        </div>
                    </div>
                    <NotificationContainer/>
                </ValidationForm>
            )
        }
    }
}

export default AddStudent;


