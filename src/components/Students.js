import React, {Component} from 'react';
import Table from './Table';
import {Link} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import API from '../utils/api.js';

class Students extends Component {

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
    }

    //Method that returns a custom "delete" button
    deleteButton = (cell) => {

        return (
            <button className="btn btn-danger"
                    onClick={() => this.deleteStudent(cell)}>Delete</button>

        );
    }

    //Method called when the "Delete" button is pressed, delete the student via the API
    deleteStudent = (studentId) => {

        API.deleteStudent(studentId)
            .then(() => {
                window.location = "/students";
            })

    }

    constructor(props) {
        super(props);
        this.state = {students: []};
    }

    componentDidMount() {


        API.getAllStudents()
            .then((data) => {
                this.setState({
                    students: data.data
                })
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
            dataField: 'number',
            text: 'Number',
            sort: true
        },{
            dataField: 'email',
            text: 'email',
            sort: true
        }, {
            dataField: '_id',
            text: 'Edit',
            formatter: this.editButton
        }, {
            dataField: '_id',
            text: 'Delete',
            formatter: this.deleteButton
        }];

        return (

            <div className="col-10 mx-auto">
                <h3 className="titleMarginTop text-left">Students</h3>
                <Table data={this.state.students}
                       columns={columns}
                       id="number"
                       sort="lastName"
                       search="a student"/>
                <Link className="btn btn-custom float-left" to="/student/add">
                    Add a student
                </Link>
                <NotificationContainer/>
            </div>
        );
    }
}

export default Students;