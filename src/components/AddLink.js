import React, {Component} from 'react';
import {SelectGroup, TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import {NotificationManager, NotificationContainer} from "react-notifications";
import {Redirect} from 'react-router-dom';
import TimeRange from 'react-time-range';
import moment from 'moment';
import API from "../utils/api";

//Component class to add a new link
class AddLink extends Component {

    //Add the link via the API with a POST request
    addLink = (event) => {

        //Prevent the default action
        event.preventDefault();

        const link = {
            no: this.state.no,
            weekNo: this.state.weekNo,
            title: this.state.title,
            link: this.state.link,
            type: this.state.type,
            level: this.state.level,
            type: this.state.type,
        }

        API.postLink(link).then(function (data) {
            console.log(data.data);
        })


    }

    //Alert the user if there is any input errors
    handleErrorSubmit = (e, formData, errorInputs) => {
        console.error(errorInputs);
        NotificationManager.error("Error with the values entered, please try again");
    }

    //Handle the change on input fields
    inputChanged = (event) => {

        console.log(event.target.name)
        console.log(event.target.value)

        //Set the new value to the appropriate state
        this.setState({[event.target.name]: event.target.value})

    }

    //Method called immediately after the component is mounted,

    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            no: 0,
            weekNo: 0,
            title: '',
            link: '',
            type: 'link',
            redirect: false
        }
    }

    //Used to get data from the API via HTTP GET Request
    componentDidMount() {

    }

    //Render method
    render() {

        //Check if redirect state is true
        if (this.state.redirect) {
            //Redirect to the customers page
            return (<Redirect to='/courses'/>);
        } else {

            return (
                //Return the form
                <ValidationForm onSubmit={this.addLink} onErrorSubmit={this.handleErrorSubmit}>
                    <div className="form-group row">
                        <label for="title" className="col-4 col-form-label">Title</label>
                        <div className="col-8">
                            <input id="title" name="title" placeholder="Enter a title" type="text"
                                   className="form-control here" required="required"
                                   value={this.state.title} onChange={this.inputChanged}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="link" className="col-4 col-form-label">URL</label>
                        <div className="col-8">
                            <input id="link" name="link" placeholder="Enter the URL" type="text"
                                   className="form-control here"
                                   value={this.state.link} onChange={this.inputChanged}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="offset-4 col-8">
                            <button name="submit" type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </ValidationForm>
            )
        }
    }
}

export default AddLink;


