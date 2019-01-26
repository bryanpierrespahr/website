import React, {Component} from 'react';
import Table from './Table';
import {Link} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import API from '../utils/api.js';

class MyCourses extends Component {

    //Method that returns a custom "select" button
    selectButton = (cell) => {

        return (

            <Link className="btn btn-success" to=
                {{
                    pathname: "course/" + cell,
                    courseId: cell
                }}
            >
                Select
            </Link>

        );
    }

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            teacherId: '',
        };
    }

    componentDidMount() {

        const teacherId = sessionStorage.getItem('teacherId');
        this.setState({
            teacherId: teacherId
        })

        API.getAllCourses()
            .then((data) => {

                var myCourses = [];
                var courses = data.data;

                for (var i = 0; i < courses.length; i++) {
                    console.log(courses[i].teacherId)
                    console.log(teacherId)
                    if (courses[i].teacherId == teacherId) {
                        myCourses.push(courses[i])
                    }

                }

                console.log(myCourses)

                this.setState({
                    courses: myCourses
                })
            }).catch((error) => {
            console.log(error);
        })

    }

    render() {

        //Initiate the columns that are passed to the table component
        const columns = [{
            dataField: 'name',
            text: 'Name',
            sort: true
        }, {
            dataField: 'code',
            text: 'Code',
            sort: true
        }, {
            dataField: 'language',
            text: 'Language',
            sort: true
        }, {
            dataField: '_id',
            text: 'Select',
            formatter: this.selectButton
        }];

        return (

            <div className="col-10 mx-auto">
                <h3 className="titleMarginTop text-left">Courses</h3>
                <Table data={this.state.courses}
                       columns={columns}
                       id="code"
                       sort="name"
                       search="a course"/>
                <Link className="btn btn-custom float-left" to="/course/add">
                    Add a course
                </Link>
                <NotificationContainer/>
            </div>
        );
    }
}

export default MyCourses;