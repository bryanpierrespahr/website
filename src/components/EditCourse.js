import React, {Component} from 'react';
import {NotificationManager, NotificationContainer} from "react-notifications";
import {SelectGroup, TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import validator from 'validator';
import TimeRange from 'react-time-range';
import {Redirect} from 'react-router-dom';
import API from "../utils/api";

//Component class that renders a form to edit a course info using 'bootstrap4-form-validation'
class EditCourse extends Component {

    //Save the modifications and update the courses info with the API via a POST request
    saveModification = (e) => {

        e.preventDefault();

        console.log("SAVE MODIFICATION")

        var url = "http://192.168.0.106:3001/course/" + this.props.location.param1;

        console.log(url);

        var course = {
            name: this.state.name,
            code: this.state.code,
            scope: this.state.scope,
            timing: this.state.timing,
            level: this.state.level,
            type: this.state.type,
            language: this.state.language,
            teacherId: this.state.teacherId,
            objectives: this.state.objectives,
            room: this.state.room,
            day: this.state.day,
            startHour: this.state.startHour,
            endHour: this.state.endHour,

        }

        console.log(course);

        API.patchCourse(this.props.location.param1, course);

        // fetch(url, {
        //     method: 'PATCH',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         name: this.state.name
        //     })
        // }).then(() => {
        //     console.log("SUCCESS")
        // });

        // fetch(url, {
        //     method: 'PATCH', //PATCH method
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     //Convert the customer object to a string and insert it in the body of the request
        //     body: JSON.stringify({
        //         firstname: this.state.firstName,
        //         lastname: this.state.lastName,
        //         streetaddress: this.state.address,
        //         postcode: this.state.postCode,
        //         city: this.state.city,
        //         email: this.state.email,
        //         phone: this.state.phone,
        //     })
        //
        // }).then(() => {
        //     //Notify the user of the success of the request
        //     NotificationManager.success("Modifications saved !")
        //     setTimeout(() => {
        //         //Redirect the user after 2 sec
        //         this.setState({
        //             redirect: true
        //         });
        //     }, 2000);
        // }).catch((error) => {
        //     //If the request failed, notify the user
        //     NotificationManager.error("Error updating customer, please try again later");
        // });

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

        console.log("CHANGED")

        console.log(event.startTime)

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

                this.setState({
                    course: course,
                    name: course.name,
                    code: course.code,
                    scope: course.scope,
                    timing: course.timing,
                    level: course.level,
                    type: course.type,
                    language: course.language,
                    teacherId: course.teacherId,
                    objectives: course.objectives,
                    room: course.schedule.room,
                    day: course.schedule.day,
                    startHour: course.schedule.startHour,
                    endHour: course.schedule.endHour,

                })
            })
            .catch((error) => {
                console.log(error);
            })

        API.getAllTeachers()
            .then((data) => {
                this.setState({
                    teachers: data.data
                })
            })
            .catch((error) => {
                console.log(error);
            })

        // //URL to fetch
        // var url;
        //
        // //If the ID is specified in the URL
        // if (this.props.match.params.id == undefined) {
        //     url = this.props.location.param1;
        // } else {
        //     url = "https://customerrest.herokuapp.com/api/customers/" + this.props.match.params.id;
        // }
        // fetch(url)
        //     .then((response) => response.json())
        //     .then((json) => {
        //
        //         this.setState({
        //             firstName: json.firstname,
        //             lastName: json.lastname,
        //             address: json.streetaddress,
        //             postCode: json.postcode,
        //             city: json.city,
        //             email: json.email,
        //             phone: json.phone
        //         })
        //     }).catch((error) => {
        //     NotificationManager.error("Error getting customers, please try again later");
        // });
    }

    //Render method
    render() {

        //Create the options (list of teachers) for the dropdown list
        const optionsTeachers = this.state.teachers.map((val, index) =>
            //Map the _id as the key and the firstname + lastname as value from the array
            <option key={val._id} value={val._id}>{val.firstName + " " + val.lastName}</option>);

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
                            <button onClick={this.backToCourses} className="btn btn-danger" style={{
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

export default EditCourse;


