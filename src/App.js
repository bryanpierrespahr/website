import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Dashboard} from './components/Dashboard.js';
import {HomePage} from './components/HomePage';
import {Login} from './components/Login.js';
import {Signup} from './components/Signup.js';
import Courses from './components/Courses.js';
import Course from './components/Course';
import Students from './components/Students.js';
import Teachers from './components/Teachers.js';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import AddCourse from './components/AddCourse';
import EditCourse from './components/EditCourse';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import AddTeacher from './components/AddTeacher';
import EditTeacher from './components/EditTeacher';
import {PrivateRoute} from './components/PrivateRoute.js';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <NavigationBar/>
                        <Switch>
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/signup" component={Signup}/>
                            <PrivateRoute path='/dashboard' component={Dashboard}/>
                            <PrivateRoute path='/courses' component={Courses}/>
                            <PrivateRoute path="/course/add" component={AddCourse}/>
                            <PrivateRoute path="/course/edit" component={EditCourse}/>
                            <PrivateRoute path='/students' component={Students}/>
                            <PrivateRoute path="/student/add" component={AddStudent}/>
                            <PrivateRoute path="/student/edit" component={EditStudent}/>
                            <PrivateRoute path='/teachers' component={Teachers}/>
                            <PrivateRoute path="/teacher/add" component={AddTeacher}/>
                            <PrivateRoute path="/teacher/edit" component={EditTeacher}/>
                            <PrivateRoute path="/course/:courseName" component={Course}/>
                        </Switch>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
