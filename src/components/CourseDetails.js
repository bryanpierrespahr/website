import React, {Component} from 'react';
import {NotificationManager, NotificationContainer} from "react-notifications";
import {SelectGroup, TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import validator from 'validator';
import moment from 'moment';
import TimeRange from 'react-time-range';
import {Redirect} from 'react-router-dom';
import API from "../utils/api";

//Component class that renders a form to edit a course info using 'bootstrap4-form-validation'
class CourseDetails extends Component {

    //Save the modifications and update the courses info with the API via a POST request
    saveModification = (e) => {

        e.preventDefault();

        var course = {
            name: this.state.name,
            code: this.state.code,
            scope: this.state.scope,
            timing: this.state.timing,
            level: this.state.level,
            type: this.state.type,
            path: this.state.path,
            language: this.state.language,
            teacherId: this.state.teacherId,
            objectives: this.state.objectives,
            room: this.state.room,
            day: this.state.day,
            startHour: this.state.startHour,
            endHour: this.state.endHour,

        }

        console.log(course);

        API.patchCourse(this.props.location.param1, course).then(() => {
            window.location = "/courses"
        })

    }

    //Called when the "Cancel" button is pressed, redirect to the previous /courses URL
    backToCourses = () => {

        this.props.history.push('/courses');

    }

    //Handle the change on input fields
    inputChanged = (event) => {
        //Set the new value to the appropriate state
        this.setState({[event.target.name]: event.target.value})
    }

    handleErrorSubmit = () => {

    }


    timeChanged = (event) => {

        this.setState({
            startHour: event.startTime,
            endHour: event.endTime
        })

    }

    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            course: null,
            teachers: [],
            name: '',
            code: '',
            scope: '',
            timing: '',
            language: '',
            level: '',
            type: '',
            path: '',
            objectives: '',
            teacherId: '',
            startHour: '',
            endHour: '',
            room: '',
            redirect: false
        }
    }

    //Used to get data from the API via HTTP GET Request
    componentDidMount() {

        API.getCourse(this.props.location.param1)
            .then((data) => {

                var course = data.data;

                console.log(course);

                this.setState({
                    course: course,
                    name: course.name,
                    code: course.code,
                    scope: course.scope,
                    timing: course.timing,
                    level: course.level,
                    type: course.type,
                    path: course.path,
                    language: course.language,
                    teacherId: course.teacherId,
                    objectives: course.objectives,
                    room: course.schedule.room,
                    day: course.schedule.day,
                    startHour: course.schedule.startHour,
                    startH: moment(course.schedule.startHour).format("HH:mm"),
                    endHour: course.schedule.endHour,
                    endH: moment(course.schedule.endHour).format("HH:mm"),
                })

            })
            .then(() => {

                API.getTeacher(this.state.teacherId)
                    .then((data) => {

                        let teacher = data.data;
                        let teacherName = teacher.firstName+" "+teacher.lastName;

                        this.setState({
                            teacherName: teacherName
                        })
                    })
                    .catch((error) => {
                        console.log(error);
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
            return (<Redirect to='/courses'/>);
        } else {

            const course = this.state.course;

            return (
                //Return the form
                <ValidationForm onSubmit={this.saveModification} onErrorSubmit={this.handleErrorSubmit}
                                action="/customers">
                    <div className="col-md-6 mx-auto">
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="name" className="float-left">Name</label>
                                <TextInput  readOnly name="name" className="form-control" id="name"
                                           placeholder="Enter course name"
                                           value={this.state.name} onChange={this.inputChanged}
                                           required
                                />
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="code" className="float-left">Code</label>
                                <TextInput readOnly className="form-control" id="code" placeholder="Enter course code"
                                           name="code" value={this.state.code} onChange={this.inputChanged}
                                           required/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="scope" className="float-left">Scope</label>
                                <TextInput readOnly name="scope" className="form-control" id="scope"
                                           value={this.state.scope}
                                />

                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="timing" className="float-left">Timing</label>
                                <TextInput  readOnly name="timing" className="form-control" id="timing"
                                           value={this.state.timing}/>
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="level" className="float-left">Level</label>
                                <TextInput readOnly  name="level" className="form-control" id="level"
                                           value={this.state.level}
                                />
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="type" className="float-left">Type</label>
                                <TextInput readOnly  name="type" className="form-control" id="type"
                                           value={this.state.type}/>
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="path" className="float-left">Path</label>
                                <TextInput  readOnly name="path" className="form-control" id="path"
                                           value={this.state.path}/>
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="language" className="float-left">Language</label>
                                <TextInput readOnly  name="language" className="form-control" id="language"
                                           value={this.state.language}/>
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="teacherName" className="float-left">Teacher</label>
                                <TextInput readOnly  name="teacherName" className="form-control" id="teacherName"
                                           value={this.state.teacherName}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label className="float-left" htmlFor="objectives">Objectives</label>
                                <textarea readOnly className="form-control" id="objectives" cols="40" rows="5"
                                          placeholder="Write the course objectives"
                                          name="objectives" value={this.state.objectives} onChange={this.inputChanged}
                                          required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label className="float-left" htmlFor="room">Room</label>
                                <TextInput  readOnly className="form-control" id="room" placeholder="Enter the room number"
                                           name="room" value={this.state.room}/>
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="day" className="float-left">Day</label>
                                <TextInput  readOnly name="day" className="form-control" id="day"
                                           value={this.state.day}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6 mx-auto">
                                <label className="float-left" htmlFor="start">Starting hour</label>
                                <TextInput  readOnly className="form-control" id="start"
                                           name="start" value={this.state.startH}/>
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <label htmlFor="end" className="float-left">Ending hour</label>
                                <TextInput  readOnly name="end" className="form-control" id="end"
                                           value={this.state.endH}
                                />
                            </div>
                        </div>
                    </div>
                    <NotificationContainer/>
                </ValidationForm>
            )
        }
    }
}

export default CourseDetails;


