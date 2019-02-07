import React, {Component} from 'react';
import {NotificationManager, NotificationContainer} from "react-notifications";
import {SelectGroup, TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import validator from 'validator';
import TimeRange from 'react-time-range';
import {Redirect} from 'react-router-dom';
import API from "../utils/api";

//Component class that renders a form to edit a student info using 'bootstrap4-form-validation'
class EditStudent extends Component {

    //Save the modifications and update the courses info with the API via a POST request
    saveModification = (e) => {

        e.preventDefault();

        var student = {
            number: this.state.number,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password

        }

        API.patchStudent(this.props.location.param1, student) .then(() => {
            window.location = "/students"
        })

    }

    //Called when the "Cancel" button is pressed, redirect to the previous /courses URL
    backToStudents = () => {

        this.props.history.push('/students');

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
    //Check that the 2 passwords entered match with each other
    matchPassword = (value) => {
        return value && value === this.state.password;
    }

    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            firstName: '',
            lastName: '',
            email: '',
            redirect: false,
        }
    }

    //Used to get data from the API via HTTP GET Request
    componentDidMount() {

        API.getStudent(this.props.location.param1)
            .then((data) => {

                var student = data.data;

                this.setState({
                    firstName: student.firstName,
                    lastName: student.lastName,
                    number: student.number,
                    email: student.email,
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
                                action="/students">
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
                                <TextInput className="form-control" id="lastName" placeholder="Enter student last name"
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
                                           value={this.state.email} onChange={this.inputChanged}
                                           required
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
                </ValidationForm>
            )
        }
    }
}

export default EditStudent;


