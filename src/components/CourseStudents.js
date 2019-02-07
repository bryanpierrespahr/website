import React, {Component} from 'react';
import Table from './Table';
import {Link} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import API from '../utils/api.js';

class CourseStudents extends Component {

    //Method that returns a custom "edit" button
    detailsButton = (cell) => {

        return (

            <Link className="btn btn-warning" to=
                {{
                    pathname: "/student/"+cell,
                    studentId: cell,
                    courseId: this.state.courseId
                }}
            >
                Details
            </Link>

        );
    }
    getStudentsInfo = () => {

        console.log("GETTING STUDENT INFO")
        console.log(this.state.courseStudents)

        var student;
        var students = [];

        for (var i = 0; i < this.state.courseStudents.length; i++) {

            API.getStudent(this.state.courseStudents[i])
                .then(data => {

                    student = data.data;

                    for (var z = 0; z < student.courses.length; z++) {


                        if (student.courses[z].courseId == this.state.courseId) {

                            if (student.courses[z].globalScore > this.state.bestScore)
                                this.state.bestStudent = student;
                            if (student.courses[z].timeSpent > this.state.mostTime)
                                this.state.mostTimeStudent = student;
                            if (student.courses[z].percentage > this.state.mostAdvanced)
                                this.state.mostAdvancedStudent = student;

                            if (student.courses[z].globalScore < this.state.lowestScore)
                                this.state.lowestStudent = student;
                            if (student.courses[z].timeSpent < this.state.lessTime)
                                this.state.lowestStudent = student;
                            if (student.courses[z].percentage < this.state.lessAdvanced)
                                this.state.lowestStudent = student;

                            var moment = require("moment");

                            const seconds = student.courses[z].timeSpent;
                            const time = moment.utc(seconds * 1000).format('HH:mm:ss');

                            var c = student.courses[z];
                            student.courses = c;
                            student.courses.timeSpent = time;
                            console.log("Student : " + student)
                            break;

                        } else {
                            console.log("pas egal")
                        }
                    }

                })
                .then(() => {

                    console.log("Student : " + student)
                    students.push(student);

                    this
                        .setState({
                            students: students,
                            ready: true,
                        }, () => console.log("Students : " + JSON.stringify(this.state.students[0])))

                }).catch((error) => {
                console.error(error);
            })

        }

    }

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            bestScore: 0,
            lowestScore: 101,
            mostTime: 0,
            lessTime: 9999999999999999999999999999999,
            mostAdvanced: 0,
            lessAdvanced: 101,
        };
    }

    componentDidMount() {

        var courseId = this.props.location.courseId;

        this.setState({
            courseId: courseId
        })

        API.getCourse(courseId)
            .then((data) => {

                var course = data.data;

                this.setState({
                    course: course,
                    courseStudents: course.students,
                })
            })
            .then(() => {
                console.log(this.state.students)
                this.getStudentsInfo();
            })
            .catch((error) => {
                console.log(error);
            })

    }

    render() {


        //Initiate the columns that are passed to the table component
        const columns = [{
            dataField: 'firstName',
            text: 'First name',
            sort: true
        }, {
            dataField: 'lastName',
            text: 'Last name',
            sort: true
        }, {
            dataField: 'courses.percentage',
            text: '% Done',
            sort: true
        }, {
            dataField: 'courses.globalScore',
            text: 'Avg. score',
            sort: true
        }, {
            dataField: 'courses.timeSpent',
            text: 'Time spent',
            sort: true
        }, {
            dataField: '_id',
            text: 'Details',
            formatter: this.detailsButton
        },];

        if (this.state.ready) {
            return (
                <div className="Participants">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <h3 className="titleMarginTop text-left">Participants</h3>
                            <Table data={this.state.students}
                                   columns={columns}
                                   id="number"
                                   sort="courses.globalScore"
                                   search="a student"/>
                            <Link className="btn btn-custom float-left" to="/student/add">
                                Add a student
                            </Link>
                            <NotificationContainer/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <h3 className="titleMarginTop text-left">Leaderboard</h3>

                        </div>
                    </div>
                    <div className="row">
                        <table className="tablee">
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td className="tablerow">Best student :</td>
                                <td
                                    className="tablerow"> {this.state.bestStudent.firstName} {this.state.bestStudent.lastName} </td>
                                <td className="tablerow"></td>
                                <td className="tablerow">Average score : </td>
                                <td className="tablerow"> {this.state.bestStudent.courses.globalScore} </td>
                            </tr>
                            <tr>
                                <td className="tablerow">Most advanced student :</td>
                                <td
                                    className="tablerow"> {this.state.bestStudent.firstName} {this.state.bestStudent.lastName} </td>
                                <td className="tablerow"></td>
                                <td className="tablerow">% Done : </td>
                                <td className="tablerow"> {this.state.bestStudent.courses.percentage} </td>
                            </tr>
                            <tr>
                                <td className="tablerow">Most invested student :</td>
                                <td
                                    className="tablerow"> {this.state.bestStudent.firstName} {this.state.bestStudent.lastName} </td>
                                <td className="tablerow"></td>
                                <td className="tablerow">Time spent : </td>
                                <td className="tablerow"> {this.state.bestStudent.courses.timeSpent} </td>
                            </tr>
                        </table>
                        <table className="tablee">
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td className="tablerow">Lowest student :</td>
                                <td
                                    className="tablerow"> {this.state.lowestStudent.firstName} {this.state.lowestStudent.lastName} </td>
                                <td className="tablerow"></td>
                                <td className="tablerow">Average score : </td>
                                <td className="tablerow"> {this.state.lowestStudent.courses.globalScore} </td>
                            </tr>
                            <tr>
                                <td className="tablerow">Less advanced student :</td>
                                <td
                                    className="tablerow"> {this.state.lowestStudent.firstName} {this.state.lowestStudent.lastName} </td>
                                <td className="tablerow"></td>
                                <td className="tablerow">% Done : </td>
                                <td className="tablerow"> {this.state.lowestStudent.courses.percentage} </td>
                            </tr>
                            <tr>
                                <td className="tablerow">Less invested student :</td>
                                <td
                                    className="tablerow"> {this.state.lowestStudent.firstName} {this.state.lowestStudent.lastName} </td>
                                <td className="tablerow"></td>
                                <td className="tablerow">Time spent : </td>
                                <td className="tablerow"> {this.state.lowestStudent.courses.timeSpent} </td>
                            </tr>
                        </table>
                    </div>
                </div>

            );
        } else {

            return (
                <div></div>
            )
        }

    }
}

export default CourseStudents;