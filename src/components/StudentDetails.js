import React, {Component} from 'react';
import Result from "../components/Result"
import API from "../utils/api";
import {Link} from "react-router-dom";
import {MdMailOutline} from "react-icons/md";

class StudentDetails extends Component {


    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }

    //Used to get data from the API via HTTP GET Request
    componentDidMount() {

        var studentId;
        var courseId;

        if (this.props.location.courseId != null) {
            courseId = this.props.location.courseId;
        } else {
            courseId = this.props.location.pathname.split("/")[4];
        }

        if (this.props.location.studentId != null) {
            studentId = this.props.location.studentId;
        } else {
            studentId = this.props.location.pathname.split("/")[2];
        }


        this.setState({
            courseId: courseId,
            studentId: studentId,
        });

        let course;

        API.getCourse(courseId)
            .then((data) => {
                course = data.data;
                this.setState({
                    course: course
                })
            }).catch((error) => {
            console.error(error);
        });

        var student;

        API.getStudent(studentId)
            .then((data) => {
                student = data.data;

                for (var z = 0; z < student.courses.length; z++) {
                    if (student.courses[z].courseId == this.state.courseId) {
                        var moment = require("moment");

                        const seconds = student.courses[z].timeSpent;
                        const time = moment.utc(seconds * 1000).format('HH:mm:ss');

                        var c = student.courses[z];
                        student.courses = c;
                        student.courses.timeSpent = time;
                        break;
                    }
                }
            })
            .then(() => {
                this.setState({
                    student: student,
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

            const globalScore = this.state.student.courses.globalScore;
            const roundedGS = Math.round(globalScore * 100) / 100;
            return (

                <div class="container">

                    <div className="profile paddingBottom15">
                        <div className="row">
                            <div className="col-md-12 profilePicture">
                                <img alt="Student profile picture"
                                     src="https://reliablehomeoffer.com/wp-content/uploads/sites/3/2016/02/student-profile-simone-bianchi-piantini.jpg"
                                     width="200"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <p className="profile">
                                    {this.state.student.firstName} {this.state.student.lastName}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <p className="profile">
                                    {this.state.student.email}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <p className="profile">
                                    {this.state.student.number}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <p className="profile">
                                    <a className="marginLeft5px" href={'/quiz/'+this.state.quizId}>{this.state.title}</a>
                                    <a className="btn btn-custom buttonEmail" href={"mailto:"+this.state.student.email+"?subject="+this.state.course.name+" course"}>
                                        Contact him
                                        <MdMailOutline className="emailicon" size="1.2em"></MdMailOutline>
                                    </a>

                                </p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="col-md-8 mx-auto">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="resultTitle simpleBorder">
                                    Overview
                                </h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="studentResult">
                                    Global score
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p className="studentResult">
                                    {roundedGS} %
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="studentResult">
                                    % Done
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p className="studentResult">
                                    {this.state.student.courses.percentage} %
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p className="studentResult">
                                    Time spent
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p className="studentResult">
                                    {this.state.student.courses.timeSpent}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="resultTitle simpleBorder">
                                    Results
                                </h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {
                                    this.state.student.courses.globalResults.map(result => {
                                        return <Result result={result} studentId={this.state.student._id}/>
                                    })
                                }
                            </div>
                        </div>
                        <div className="row average">
                            <div className="col-md-6">
                                <p className="studentResult">
                                    Average
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p className="studentResult">
                                    {roundedGS} %
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            )
        }
    }
}

export default StudentDetails;


