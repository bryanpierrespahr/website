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

        //TODO: change
        //this.props.location.courseId
        this.setState({
            courseId: "5bebee74e4e0e774e4eb6982"
        })

        var student;

        //TODO: change
        //this.props.location.studentId
        API.getStudent("5bebf038a58c013f583b38c1")
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
                                {this.state.student.courses.globalScore}
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
                                    return <Result id={result._id} title={result.title} score={result.score} />
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
                                {this.state.student.courses.globalScore}
                            </h3>
                        </div>
                    </div>
                </div>

            )
        }
    }
}

export default StudentDetails;


