import React, {Component} from 'react';
import Table from './Table';
import {Link} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import API from '../utils/api.js';

class MyCourses extends Component {

    //Method that returns a custom "select" button
    detailsButton = (cell) => {

        return (

            <Link className="btn btn-success" to=
                {{
                    pathname: "course/" + cell,
                    courseId: cell
                }}
            >
                Details
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
        console.log("Teacher id :"+teacherId);
        this.setState({
            teacherId: teacherId
        })

        API.getAllCourses()
            .then((data) => {

                var myCourses = [];
                var courses = data.data;

                for (var i = 0; i < courses.length; i++) {
                    console.log("Course teach id "+courses[i].teacherId);
                    console.log("Teacher id "+teacherId);
                    if (courses[i].teacherId == teacherId)
                        myCourses.push(courses[i])
                }



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
            text: 'Details',
            formatter: this.detailsButton
        }];

        if(this.state.courses.length < 1){
            return(
                <div className="col-10 mx-auto">
                    <h3 className="titleMarginTop text-left">My courses</h3>
                    <Table data={this.state.courses}
                           columns={columns}
                           id="code"
                           sort="name"
                           search="a course"/>

                    <h3>You don't have any course</h3>
                    <NotificationContainer/>
                </div>
            )
        }

        return (

            <div className="col-10 mx-auto">
                <h3 className="titleMarginTop text-left">My courses</h3>
                <Table data={this.state.courses}
                       columns={columns}
                       id="code"
                       sort="name"
                       search="a course"/>
                <NotificationContainer/>
            </div>
        );
    }
}

export default MyCourses;