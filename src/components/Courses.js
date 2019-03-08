import React, {Component} from 'react';
import Table from './Table';
import {Link} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import API from '../utils/api.js';

class Courses extends Component {

    //Method that returns a custom "edit" button
    editButton = (cell) => {

        return (

            <Link className="btn btn-warning" to=
                {{
                    pathname: "/course/edit",
                    param1: cell
                }}
            >
                Edit
            </Link>

        );
    };

    //Method that returns a custom "delete" button
    deleteButton = (cell) => {

        return (
            <button className="btn btn-danger"
                    onClick={() => this.deleteCourse(cell)}>Delete</button>

        );
    };

    //Method that returns a custom "edit" button
    detailsButton = (cell) => {

        return (

            <Link className="btn btn-success" to=
                {{
                    pathname: "/course/details/"+cell,
                    param1: cell
                }}
            >
                Details
            </Link>

        );
    }

    //Method called when the "Delete" button is pressed, delete the course via the API
    deleteCourse = (courseId) => {

        API.deleteCourse(courseId)
            .then(() => {
                window.location = "/courses";
            })

    }

    constructor(props) {
        super(props);
        this.state = {courses: []};
    }

    componentDidMount() {


        API.getAllCourses()
            .then((data) => {
                this.setState({
                    courses: data.data
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }

    render() {

        //Initiate the columns that are passed to the table component
        const adminColumns = [{
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
        }, {
            dataField: '_id',
            text: 'Edit',
            formatter: this.editButton
        }, {
            dataField: '_id',
            text: 'Delete',
            formatter: this.deleteButton
        }];

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

        if(sessionStorage.getItem('role') == "admin"){
            return (
                <div className="col-10 mx-auto">
                    <h3 className="titleMarginTop text-left">Courses</h3>
                    <Table data={this.state.courses}
                           columns={adminColumns}
                           id="code"
                           sort="name"
                           search="a course"/>
                    <Link className="btn btn-custom float-left" to="/course/add">
                        Add a course
                    </Link>
                    <NotificationContainer/>
                </div>
            );
        }else{
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
}

export default Courses;