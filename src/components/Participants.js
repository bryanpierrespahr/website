import React, {Component} from 'react';
import Table from './Table';
import {Link} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import API from '../utils/api.js';

class Participants extends Component {

    //Method that returns a custom "details" button
    detailsButton = (cell) => {

        return (

            <Link className="btn btn-warning" to=
                {{
                    pathname: "/student/" + cell +"/course/"+this.state.courseId,
                    studentId: cell,
                    courseId: this.state.courseId,
                    studentId: cell,
                }}
            >
                Details
            </Link>

        );
    }

    getStudentsInfo = () => {


        var student;
        var students = [];

        for (var i = 0; i < this.state.courseStudents.length; i++) {

            API.getStudent(this.state.courseStudents[i])
                .then((data) => {

                    student = data.data;

                    for (var z = 0; z < student.courses.length; z++) {

                        if (student.courses[z].courseId == this.state.courseId) {

                            var currentStudent = student.courses[z];

                            if (currentStudent.globalScore > this.state.bestScore)
                            {
                                this.setState({
                                    bestStudent: student,
                                    bestScore: currentStudent.globalScore
                                }, () => console.log(student))
                            }



                            if (currentStudent.timeSpent > this.state.mostTime)
                                this.setState({
                                    mostTimeStudent: student,
                                    mostTime: currentStudent.timeSpent
                                })

                            if (currentStudent.percentage > this.state.mostAdvanced)
                                this.setState({
                                    mostAdvancedStudent: student,
                                    mostAdvanced: currentStudent.percentage
                                })

                            if (currentStudent.globalScore < this.state.lowestScore)
                                this.setState({
                                    lowestStudent: student,
                                    lowestScore: currentStudent.globalScore
                                })

                            if (currentStudent.timeSpent < this.state.lessTime)
                                this.setState({
                                    lessTimeStudent: student,
                                    lessTime: currentStudent.timSpent
                                })

                            if (currentStudent.percentage < this.state.lessAdvanced)
                                this.setState({
                                    lessAdvancedStudent: student,
                                    lessAdvanced: currentStudent.percentage
                                })

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

                    students.push(student);

                    this.setState({
                        students: students,
                    }, () => {
                        this.setState({
                            ready: true,
                        })
                    })

                })
                .catch((error) => {
                    console.error(error);
                })

        }

    }

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            ready: false,
            bestScore: -1,
            lowestScore: 101,
            mostTime: -1,
            lessTime: 9999999999999999999999999999999,
            mostAdvanced: -1,
            lessAdvanced: 101,
        };
    }

    componentDidMount() {


        var courseId;

        if (this.props.location.courseId != null) {
            courseId = this.props.location.courseId;
        } else {
            courseId = this.props.location.pathname.split("/")[1];
        }

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

                if (this.state.courseStudents.length > 0) {
                    this.getStudentsInfo();
                }


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

            const bestGlobalScore = this.state.bestStudent.courses.globalScore;
            const lowestGlobalScore = this.state.lowestStudent.courses.globalScore;

            const roundedBestGS = Math.round(bestGlobalScore * 100) / 100;
            const roundedLowestGS = Math.round(lowestGlobalScore * 100) / 100;

            const courseId = this.state.courseId;
            const bestStudent = this.state.bestStudent;
            const mostTimeStudent = this.state.mostTimeStudent;
            const mostAdvancedStudent = this.state.mostAdvancedStudent;
            const lowestStudent = this.state.lowestStudent;
            const lessTimeStudent = this.state.lessTimeStudent;
            const lessAdvancedStudent = this.state.lessAdvancedStudent;

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
                            <Link className="btn btn-custom float-left" to="students/add">
                                Add a student
                            </Link>
                            <NotificationContainer/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <h4 className="leaderboard text-left">Leaderboard</h4>

                        </div>
                    </div>
                    <div className="row col-10 noPadding mx-auto">
                        <div className="col-6 noPadding">
                            <table className="customTable">
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td className="tablerow leaderboard fw600 green">Best student :</td>
                                    <td
                                        className="tablerow leaderboard "> <a className="leaderboardRef" href={`/student/${bestStudent._id}/course/${courseId}`}>{bestStudent.firstName} {bestStudent.lastName}</a> </td>
                                    <td className="tablerow leaderboard"></td>
                                    <td className="tablerow leaderboard fw600 green">Average score :</td>
                                    <td className="tablerow leaderboard"> {roundedBestGS} % </td>
                                </tr>
                                <tr>
                                    <td className="tablerow leaderboard fw600 green">Most advanced student :</td>
                                    <td
                                        className="tablerow leaderboard"> <a className="leaderboardRef" href={`/student/${mostAdvancedStudent._id}/course/${courseId}`}> {mostAdvancedStudent.firstName} {mostAdvancedStudent.lastName} </a></td>
                                    <td className="tablerow leaderboard"></td>
                                    <td className="tablerow leaderboard fw600 green">% Done :</td>
                                    <td className="tablerow leaderboard"> {mostAdvancedStudent.courses.percentage}</td>
                                </tr>
                                <tr>
                                    <td className="tablerow leaderboard fw600 green">Most dedicated student :</td>
                                    <td
                                        className="tablerow leaderboard"> <a className="leaderboardRef" href={`/student/${mostTimeStudent._id}/course/${courseId}`}> {mostTimeStudent.firstName} {mostTimeStudent.lastName} </a></td>
                                    <td className="tablerow leaderboard"></td>
                                    <td className="tablerow leaderboard fw600 green">Time spent :</td>
                                    <td className="tablerow leaderboard"> {this.state.lessTimeStudent.courses.timeSpent} </td>
                                </tr>
                            </table>
                        </div>
                        <div className="col-6">
                            <table className="customTable">
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <td className="tablerow leaderboard fw600 red">Lowest student :</td>
                                    <td
                                        className="tablerow leaderboard"> <a className="leaderboardRef" href={`/student/${lowestStudent._id}/course/${courseId}`}> {lowestStudent.firstName} {lowestStudent.lastName} </a></td>
                                    <td className="tablerow leaderboard"></td>
                                    <td className="tablerow leaderboard fw600 red">Average score :</td>
                                    <td className="tablerow leaderboard"> {roundedLowestGS} %</td>
                                </tr>
                                <tr>
                                    <td className="tablerow leaderboard fw600 red">Less advanced student :</td>
                                    <td
                                        className="tablerow leaderboard"> <a className="leaderboardRef" href={`/student/${lessAdvancedStudent._id}/course/${courseId}`}> {lessAdvancedStudent.firstName} {lessAdvancedStudent.lastName}</a> </td>
                                    <td className="tablerow leaderboard"></td>
                                    <td className="tablerow leaderboard fw600 red">% Done :</td>
                                    <td className="tablerow"> {lessAdvancedStudent.courses.percentage} </td>
                                </tr>
                                <tr>
                                    <td className="tablerow leaderboard fw600 red">Less dedicated student :</td>
                                    <td
                                        className="tablerow leaderboard"> <a className="leaderboardRef" href={`/student/${lessTimeStudent._id}/course/${courseId}`}> {lessTimeStudent.firstName} {lessTimeStudent.lastName} </a></td>
                                    <td className="tablerow leaderboard"></td>
                                    <td className="tablerow leaderboard fw600 red">Time spent :</td>
                                    <td className="tablerow leaderboard"> {lowestStudent.courses.timeSpent} </td>
                                </tr>
                            </table>
                        </div>

                    </div>
                </div>

            );

        } else {

            return (

                <div>

                    <h3 className="marginTop20px">There is no student</h3>

                </div>

            )
        }

    }
}

export default Participants;