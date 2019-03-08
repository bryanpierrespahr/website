import React, {Component} from 'react';
import Result from "../components/Result"
import API from "../utils/api";

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

        console.log("Student id : "+studentId);
        console.log("course id : "+courseId)

        this.setState({
            courseId: courseId,
            studentId: studentId,
        })

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
                        console.log("Student : " + student)
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
                    <div class="row">
                        <div class="col-md-12">
                            <img alt="Bootstrap Image Preview"
                                 src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h3>
                                {this.state.student.firstName} {this.state.student.lastName}
                            </h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h3>
                                {this.state.student.email}
                            </h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h3>
                                {this.state.student.number}
                            </h3>
                        </div>
                    </div>
                    <br/>
                    <div class="row">
                        <div class="col-md-12">
                            <h3 className="text-left">
                                Overview
                            </h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <h3>
                                Global score
                            </h3>
                        </div>
                        <div class="col-md-6">
                            <h3>
                                {roundedGS} %
                            </h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <h3>
                                % Done
                            </h3>
                        </div>
                        <div class="col-md-6">
                            <h3>
                                {this.state.student.courses.percentage} %
                            </h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <h3>
                                Time spent
                            </h3>
                        </div>
                        <div class="col-md-6">
                            <h3>
                                {this.state.student.courses.timeSpent}
                            </h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h3 className="text-left">
                                Results
                            </h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            {
                                this.state.student.courses.globalResults.map(result => {
                                    return <Result result={result} studentId={this.state.student._id}/>
                                })
                            }
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <h3>
                                Average
                            </h3>
                        </div>
                        <div class="col-md-6">
                            <h3>
                                {roundedGS} %
                            </h3>
                        </div>
                    </div>
                </div>

            )
        }
    }
}

export default StudentDetails;


