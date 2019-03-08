import React, {Component} from 'react';
import Table from './Table';
import {Link} from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import API from '../utils/api.js';

class Teachers extends Component {

    //Method that returns a custom "edit" button
    detailsButton = (cell) => {

        return (

            <Link className="btn btn-success" to=
                {{
                    pathname: "/teacher/"+cell,
                    param1: cell
                }}
            >
                Details
            </Link>

        );
    }


    //Method that returns a custom "edit" button
    editButton = (cell) => {

        return (

            <Link className="btn btn-warning" to=
                {{
                    pathname: "/teacher/edit",
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
                    onClick={() => this.deleteTeacher(cell)}>Delete</button>

        );
    }

    //Method called when the "Delete" button is pressed, delete the student via the API
    deleteTeacher = (teacherId) => {

        API.deleteTeacher(teacherId)
            .then(() => {
                window.location = "/teachers";
            })

    }

    constructor(props) {
        super(props);
        this.state = {teachers: []};
    }

    componentDidMount() {

        API.getAllTeachers()
            .then((data) => {
                this.setState({
                    teachers: data.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {

        //Initiate the columns that are passed to the table component
        const adminColumns = [{
            dataField: 'firstName',
            text: 'First name',
            sort: true
        }, {
            dataField: 'lastName',
            text: 'Last name',
            sort: true
        }, {
            dataField: 'email',
            text: 'email',
            sort: true
        },  {
            dataField: '_id',
            text: 'Details',
            formatter: this.detailsButton
        },{
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
            dataField: 'firstName',
            text: 'First name',
            sort: true
        }, {
            dataField: 'lastName',
            text: 'Last name',
            sort: true
        }, {
            dataField: 'email',
            text: 'email',
            sort: true
        },  {
            dataField: '_id',
            text: 'Details',
            formatter: this.detailsButton
        }];

        if(sessionStorage.getItem('role' == "admin")){
            return (

                <div className="col-10 mx-auto">
                    <h3 className="titleMarginTop text-left">Teachers</h3>
                    <Table data={this.state.teachers}
                           columns={adminColumns}
                           id="email"
                           sort="lastName"
                           search="a teacher"/>
                    <Link className="btn btn-custom float-left" to="/teacher/add">
                        Add a teacher
                    </Link>
                    <NotificationContainer/>
                </div>
            );
        }else{
            return (

                <div className="col-10 mx-auto">
                    <h3 className="titleMarginTop text-left">Teachers</h3>
                    <Table data={this.state.teachers}
                           columns={columns}
                           id="email"
                           sort="lastName"
                           search="a teacher"/>
                    <Link className="btn btn-custom float-left" to="/teacher/add">
                        Add a teacher
                    </Link>
                    <NotificationContainer/>
                </div>
            );
        }

    }
}

export default Teachers;