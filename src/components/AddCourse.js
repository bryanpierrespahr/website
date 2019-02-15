import React, {Component} from 'react';
import {SelectGroup, TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import {NotificationManager, NotificationContainer} from "react-notifications";
import {Redirect} from 'react-router-dom';
import TimeRange from 'react-time-range';
import moment from 'moment';
import API from "../utils/api";

//Component className to add a new course
class AddCourse extends Component {

    //Add the course via the API with a POST request
    addCourse = (event) => {

        //Prevent the default action
        event.preventDefault();

        // console.log(this.state.startHour);
        //
        // const startHour = moment(this.state.startHour).format('LT');
        // console.log(startHour);
        //
        // const endHour = moment(this.state.endHour).format('LT');
        // const hour = startHour + " - " + endHour;
        //
        // console.log("teacher : " + JSON.stringify(this.state.teacherId));

        const course = {
            name: this.state.name,
            code: this.state.code,
            scope: this.state.scope,
            timing: this.state.timing,
            language: this.state.language,
            level: this.state.level,
            type: this.state.type,
            path: this.state.path,
            objectives: this.state.objectives,
            teacherId: this.state.teacherId,
            schedule: {
                day: this.state.day,
                startHour: this.state.startHour,
                endHour: this.state.endHour,
                room: this.state.room,
            },
            weeks: [],
        }

        API.postCourse(course).then(function (data) {
            window.location = "/courses";
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

    timeChanged = (event) => {

        console.log("CHANGED")

        console.log(event.startTime)

        this.setState({
            startHour: event.startTime,
            endHour: event.endTime
        })

    }

    //Method called immediately after the component is mounted,

    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            course: null,
            teacherId: '5bebed87e4e0e774e4eb6981',
            teachers: [],
            name: '',
            code: '',
            scope: '3 ECTS',
            timing: '1st Semester',
            language: 'Finnish',
            level: 'Profile studies',
            path: 'Programming',
            type: 'Compulsory',
            objectives: '',
            day: 'Monday',
            startHour: '19700101T090000+0100',
            endHour: '19700101T110000+0100',
            room: '',
            redirect: false
        }
    }

    //Used to get data from the API via HTTP GET Request
    componentDidMount() {

        API.getAllTeachers()
            .then((data) => {
                this.setState({
                    teachers: data.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //Render method
    render() {

        //Create the options (list of teachers) for the dropdown list
        const optionsTeachers = this.state.teachers.map((val, index) =>
            //Map the _id as the key and the firstname + lastname as value from the array
            <option key={val._id} value={val._id}>{val.firstName + " " + val.lastName}</option>);

        //Check if redirect state is true
        if (this.state.redirect) {
            //Redirect to the customers page
            return (<Redirect to='/courses'/>);
        } else {
            return (
                //Return the form
                <ValidationForm onErrorSubmit={this.handleErrorSubmit}
                                action="/customers">
                    <div className="col-md-6 mx-auto">
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="name" className="float-left">Name</label>
                                <TextInput name="name" className="form-control" id="name"
                                           placeholder="Enter course name"
                                           value={this.state.name} onChange={this.inputChanged}
                                           required
                                />
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="code" className="float-left">Code</label>
                                <TextInput className="form-control" id="code" placeholder="Enter course code"
                                           name="code" value={this.state.code} onChange={this.inputChanged}
                                           required/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="scope" className="float-left">Scope</label>
                                <select name="scope" className="form-control" id="scope"
                                        value={this.state.scope} onChange={this.inputChanged}
                                        required
                                >
                                    <option value="3 ECTS">3 ECTS</option>
                                    <option value="5 ECTS">5 ECTS</option>
                                    <option value="10 ECTS">10 ECTS</option>
                                    <option value="15 ECTS">15 ECTS</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="timing" className="float-left">Timing</label>
                                <select name="timing" className="form-control" id="timing"
                                        value={this.state.timing} onChange={this.inputChanged}
                                        required
                                >
                                    <option value="1st Semester">1st Semester</option>
                                    <option value="2nd Semester">2nd Semester</option>
                                    <option value="3rd Semester">3rd Semester</option>
                                    <option value="4th Semester">4th Semester</option>
                                    <option value="5th Semester">5th Semester</option>
                                    <option value="6th Semester">6th Semester</option>
                                </select>
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="level" className="float-left">Level</label>
                                <select name="level" className="form-control" id="level"
                                        value={this.state.level} onChange={this.inputChanged}
                                        required
                                >
                                    <option value="Profil studies">Profil studies</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="type" className="float-left">Type</label>
                                <select name="type" className="form-control" id="type"
                                        value={this.state.type} onChange={this.inputChanged}
                                        required
                                >
                                    <option value="Compulsory">Compulsory</option>
                                    <option value="Elective">Elective</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="path" className="float-left">Path</label>
                                <select name="path" className="form-control" id="path"
                                        value={this.state.path} onChange={this.inputChanged}
                                        required
                                >
                                    <option value="Design">Design</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Business">Business</option>
                                    <option value="Technology">Technology</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="language" className="float-left">Language</label>
                                <select name="language" className="form-control" id="language"
                                        value={this.state.language} onChange={this.inputChanged}
                                        required
                                >
                                    <option value="Finnish">Finnish</option>
                                    <option value="English">English</option>
                                    <option value="Swedish">Swedish</option>
                                    <option value="German">German</option>
                                    <option value="Spanish">Spanish</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="teacherId" className="float-left">Teacher</label>
                                <SelectGroup name="teacherId" className="form-control" id="teacherId"
                                             value={this.state.teacherId} onChange={this.inputChanged}
                                             required
                                >
                                    {optionsTeachers}
                                </SelectGroup>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label className="float-left" htmlFor="objectives">Objectives</label>
                                <textarea className="form-control" id="objectives" cols="40" rows="5"
                                          placeholder="Write the course objectives"
                                          name="objectives" value={this.state.objectives} onChange={this.inputChanged}
                                          required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label className="float-left" htmlFor="room">Room</label>
                                <TextInput className="form-control" id="room" placeholder="Enter the room number"
                                           name="room" value={this.state.room} onChange={this.inputChanged}
                                           required/>
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="day" className="float-left">Day</label>
                                <select name="day" className="form-control" id="day"
                                        value={this.state.day} onChange={this.inputChanged}
                                        required
                                >
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12 mx-auto">
                                <TimeRange
                                    startMoment={this.state.startHour}
                                    endMoment={this.state.endHour}
                                    minuteIncrement={15}
                                    onChange={this.timeChanged}
                                />
                            </div>
                        </div>
                        <div className="col-md-10 mx-auto">
                            <button onClick={this.addCourse}
                                    name="submit" type="submit" className="btn btn-primary">Add course
                            </button>
                        </div>
                    </div>
                    <NotificationContainer/>
                </ValidationForm>
            )
        }
    }
}

export default AddCourse;


