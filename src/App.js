import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Dashboard} from './components/Dashboard.js';
import {HomePage} from './components/HomePage';
import {Login} from './components/Login.js';
import {SignUp} from './components/SignUp.js';
import Courses from './components/Courses.js';
import Course from './components/Course';
import Participants from './components/Participants';
import Students from './components/Students.js';
import Student from './components/Student.js';
import Teachers from './components/Teachers.js';
import Teacher from './components/Teacher.js';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import AddCourse from './components/AddCourse';
import EditCourse from './components/EditCourse';
import CourseDetails from './components/CourseDetails';
import AddStudent from './components/AddStudent';
import AddStudentCourse from './components/AddStudentCourse';
import EditStudent from './components/EditStudent';
import AddTeacher from './components/AddTeacher';
import EditTeacher from './components/EditTeacher';
import CreateQuiz from './components/CreateQuiz.js';
import CreateLink from './components/CreateLink.js';
import CreateLecture from "./components/CreateLecture";
import StudentDetails from "./components/StudentDetails";
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';
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
                            <Route exact path="/signup" component={SignUp}/>
                            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
                            <PrivateRoute exact path='/courses' component={Courses}/>
                            <PrivateRoute exact path="/course/add" component={AddCourse}/>
                            <PrivateRoute exact path="/course/edit" component={EditCourse}/>
                            <PrivateRoute exact path='/students' component={Students}/>
                            <PrivateRoute exact path="/student/add" component={AddStudent}/>
                            <PrivateRoute exact path="/student/edit" component={EditStudent}/>
                            <PrivateRoute exact path='/teachers' component={Teachers}/>
                            <PrivateRoute exact path="/teacher/add" component={AddTeacher}/>
                            <PrivateRoute exact path="/teacher/edit" component={EditTeacher}/>
                            <PrivateRoute exact path="/quiz/add" component={CreateQuiz}/>
                            <PrivateRoute exact path="/link/add" component={CreateLink}/>
                            <PrivateRoute exact path="/lecture/add" component={CreateLecture}/>
                            <PrivateRoute exact path="/:courseId/students/add" component={AddStudentCourse}/>
                            <PrivateRoute exact path="/:courseId/students" component={Participants}/>
                            <PrivateRoute exact path="/quiz/:quizId" component={Quiz}/>
                            <PrivateRoute exact path="/quiz/:quizId/student/:studentId" component={QuizResult}/>
                            <PrivateRoute exact path="/student/:studentId/course/:courseId" component={StudentDetails}/>
                            <PrivateRoute exact path="/course/:courseId" component={Course}/>
                            <PrivateRoute exact path="/course/details/:courseId" component={CourseDetails}/>
                            <PrivateRoute exact path='/student/:studentId' component={Student}/>
                            <PrivateRoute exact path='/teacher/:teacherId' component={Teacher}/>
                        </Switch>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
