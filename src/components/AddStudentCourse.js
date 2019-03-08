import React, {Component} from 'react';
import Table from './Table';
import {Link} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import API from '../utils/api.js';

//Component AddStudentCourse to add an existing student to a course
class AddStudentCourse extends Component {

    addStudent = (studentId) => {
        console.log(studentId)

        var courseStudents = this.state.courseStudents;
        courseStudents.push(studentId);

        API.patchCourseStudents(this.state.courseId, courseStudents)
            .then(() => {

                var course = this.state.course;
                console.log(this.state.course);

                var courseToAdd = {
                    courseId: this.state.courseId,
                    path: course.path,
                    globalScore: 0,
                    globalResults: [],
                    quizResults: [],
                    timeSpent: 0,
                    done: [],
                    percentage: 0
                }

                API.getStudent(studentId)
                    .then((data) => {

                        var student = data.data;
                        this.setState({
                                student: data.data
                            }, () => student.courses.push(courseToAdd)
                        )

                    }).then(() => {
                    API.patchStudentCourses(studentId, this.state.student.courses)
                        .then(() => {
                            window.location = "/" + this.state.courseId + "/students"
                        })
                })

            })
            .catch((error) => {
                console.error(error);
            })
    }

    //Method that returns a custom "add" button
    addButton = (cell) => {
        return (

            <button onClick={() => this.addStudent(cell)}>
                Add
            </button>

        );
    }

    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }

    //Used to get data from the API via HTTP GET Request
    componentDidMount() {

        var courseId = this.props.location.pathname.split("/")[1];
        this.setState({
            courseId: courseId,
        })

        var courseStudents;

        API.getCourse(courseId)
            .then((data) => {
                var course = data.data;
                courseStudents = course.students;
                this.setState({
                    course: course,
                    courseStudents: courseStudents
                })

            }).then(() => {

            API.getAllStudents()
                .then((data) => {

                    var allStudents = data.data;
                    var indexes = [];

                    for (var i = 0; i < allStudents.length; i++) {

                        for (var j = 0; j < courseStudents.length; j++) {

                            if (allStudents[i]._id == courseStudents[j]) {
                                indexes.push(i);
                            }
                        }
                    }


                    for (var k = indexes.length - 1; k >= 0; k--)
                        allStudents.splice(indexes[k], 1)


                    this.setState({
                        students: allStudents,
                        ready: true
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }


    //Render method
    render() {

        if (this.state.ready) {

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
                dataField: 'number',
                text: 'Number',
                sort: true
            }, {
                dataField: 'email',
                text: 'email',
                sort: true
            }, {
                dataField: '_id',
                text: 'Edit',
                formatter: this.addButton
            }];

            return (

                <div className="col-10 mx-auto">
                    <h3 className="titleMarginTop text-left">Students</h3>
                    <Table data={this.state.students}
                           columns={columns}
                           id="number"
                           sort="lastName"
                           search="a student"/>
                    <NotificationContainer/>
                </div>
            );

        } else {

            return (
                <div>

                </div>
            )
        }


    }
}

export default AddStudentCourse;


