import React, {Component} from 'react';
import {SelectGroup, TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import {NotificationManager, NotificationContainer} from "react-notifications";
import API from "../utils/api";

//Component class to add a new lecture
class CreateLecture extends Component {

    //Add the link via the API with a POST request
    postLecture = (event) => {

        //Prevent the default action
        event.preventDefault();

        var newLectureId;
        var lecturesId;

        const lecture = {
            no: this.state.no,
            weekNo: this.state.weekNo,
            title: this.state.title,
            link: this.state.link,
            type: this.state.type,
        }


        API.postLecture(lecture).then(function (data) {

            var newLecture = data.data.lecture;
            newLectureId = newLecture._id;


        })
            .then(() => {
                API.getWeek(this.state.weekId).then(data => {

                    var week = data.data;
                    lecturesId = week.lecturesId;

                    lecturesId.push(newLectureId);

                })
                    .then(() => {
                        API.patchLectureWeek(this.state.weekId, lecturesId).then((data) => {
                                console.log(data.data)
                            }
                        )
                    })


                window.location = "/course/" + this.state.courseId;
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
            no: 0,
            title: '',
            type: 'lecture',
            redirect: false,
            ready: false,
        }
    }

    //Used to get data from the API via HTTP GET Request
    componentDidMount() {

        console.log(this.props.location.courseId);

        this.setState({
            courseId: this.props.location.courseId,
            weekId: this.props.location.weekId,
            weekNo: this.props.location.weekNo,
            no: this.props.location.no,

        }, () => {
            this.setState({
                ready: true
            })

        })
    }

    //Render method
    render() {

        if (this.state.ready) {
            return (
                //Return the form
                <ValidationForm onSubmit={this.postLecture} onErrorSubmit={this.handleErrorSubmit}>
                    <div className="col-md-8 mx-auto">
                        <div className="form-row">
                            <div className="form-group col-md-12 mx-auto">
                                <label for="title" className="col-8 col-form-label">Title</label>
                                <input id="title" name="title" placeholder="Enter the lecture title" type="text"
                                       className="form-control here" required="required"
                                       value={this.state.title} onChange={this.inputChanged}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12 mx-auto">
                                <label for="link" className="col-8 col-form-label">URL</label>
                                <input id="link" name="link" placeholder="Paste the lecture URL" type="text"
                                       className="form-control here"
                                       value={this.state.link} onChange={this.inputChanged}/>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-12 mx-auto">
                                <div className="form-group col-md-4 mx-auto">
                                    <button name="submit" type="submit" className="btn btn-primary">Add lecture</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ValidationForm>
            )

        } else {
            return (
                //Return the form
                <div>
                </div>

            )
        }

    }
}

export default CreateLecture;


