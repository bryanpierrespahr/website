import React, {Component} from 'react';
import {SelectGroup, TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import {NotificationManager, NotificationContainer} from "react-notifications";
import {Redirect} from 'react-router-dom';
import TimeRange from 'react-time-range';
import moment from 'moment';
import API from "../utils/api";
import Question from './Question';
import {Button} from "react-bootstrap";

//Component class to add a new quiz
class CreateQuiz extends Component {

    // //Add the quiz via the API with a POST request
    // addQUiz = (event) => {
    //
    //     //Prevent the default action
    //     event.preventDefault();
    //
    //     const quiz = {
    //         no: this.state.no,
    //         weekNo: this.state.weekNo,
    //         title: this.state.title,
    //         questions: this.state.questions,
    //         type: this.state.type
    //     }
    //
    //     API.postQuiz(quiz).then(function (data) {
    //         console.log(data.data);
    //     })
    //
    //
    // }

    postQuiz = () => {

        var newQuizId;
        var quizzesId;

        const quiz = {
            no: this.state.no,
            weekNo: this.state.weekNo,
            title: this.state.title,
            questions: this.state.questions,
            type: this.state.type
        }

        API.postQuiz(quiz).then(function (data) {

            var newQuiz = data.data.quiz;
            console.log(newQuiz);
            newQuizId = newQuiz._id;
            console.log(newQuizId);

        })
            .then(() => {
                API.getWeek(this.state.weekId).then(data => {

                    var week = data.data;
                    quizzesId = week.quizzesId;

                    quizzesId.push(newQuizId);

                })
                    .then(() => {
                        API.patchQuizWeek(this.state.weekId, quizzesId).then((data) => {
                                console.log(data.data)
                            }
                        )
                    })

                //window.location = "/course/" + this.state.courseId;
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

    finish = () => {

        var question = {
            "question": this.state.question,
            "correctAnswer": this.state.correctAnswer,
            "incorrectAnswers": [this.state.incorrectAnswer1, this.state.incorrectAnswer2, this.state.incorrectAnswer3]
        }

        var questions = this.state.questions;
        questions.push(question);
        this.setState({
            questions: questions
        }, () => this.postQuiz())


    }

    //Method called immediately after the component is mounted,
    nextQuestion = () => {

        var question = {
            "question": this.state.question,
            "correctAnswer": this.state.correctAnswer,
            "incorrectAnswers": [this.state.incorrectAnswer1, this.state.incorrectAnswer2, this.state.incorrectAnswer3]
        }

        var questions = this.state.questions;
        questions.push(question);
        this.setState({
            questions: questions
        }, () => console.log(this.state.questions))


        this.setState({
            questionNo: this.state.questionNo + 1,
            question: '',
            correctAnswer: '',
            incorrectAnswer1: '',
            incorrectAnswer2: '',
            incorrectAnswer3: '',
        })


    }
    handleChange = (event) => {

        console.log(event.target.name);
        console.log(event.target.value);

        //Set the new value to the appropriate state
        this.setState({[event.target.name]: event.target.value})

    }
    getInfo = () => {

        this.setState({
            quizInfo: true
        })
    }

    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            no: 0,
            weekNo: 0,
            title: '',
            questions: [],
            incorrectAnswers: [],
            correctAnswer: '',
            type: 'quiz',
            redirect: false,
            ready: false,
            quizInfo: false,
            nbQuestions: 0,
            questionNo: 1
        }
    }

    //Used to get data from the API via HTTP GET Request
    componentDidMount() {

        console.log(this.props.location.courseId);

        this.setState({
            courseId: this.props.location.courseId,
            weekId: this.props.location.weekId,
            weekNo: this.props.location.weekNo,
            no: this.props.location.no,

        }, () => {
            this.setState({
                ready: true
            })

        })
    }

    //Render method
    render() {

        //Check if redirect state is true
        if (this.state.redirect) {
            //Redirect to the customers page
            return (<Redirect to='/courses'/>);
        }

        if (!this.state.quizInfo) {
            return (
                <div className="container">
                    <ValidationForm onErrorSubmit={this.handleErrorSubmit}>
                        <div className="col-md-8 mx-auto">
                            <div className="form-row">
                                <div className="form-group col-md-12 mx-auto">
                                    <label htmlFor="title"
                                           className="float-left">Title</label>
                                    <TextInput name="title" className="form-control" id="title"
                                               placeholder="Enter quiz title"
                                               value={this.state.title} onChange={this.inputChanged}
                                               required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12 mx-auto">
                                    <label htmlFor="nbQuestions" className="float-left">Number of questions</label>
                                    <TextInput type="number" min="1" max="20" name="nbQuestions"
                                               className="form-control" id="nbQuestions"
                                               placeholder="Enter number of question"
                                               value={this.state.nbQuestions} onChange={this.inputChanged}
                                               required
                                    />
                                </div>
                            </div>
                        </div>
                    </ValidationForm>
                    <Button
                        onClick={this.getInfo}
                        bsSize="large"
                        type="submit"
                    >
                        Next
                    </Button>
                </div>
            )

        } else if (this.state.ready) {
            return (
                //Return the form
                <div>
                    <Question questionNo={this.state.questionNo} nbQuestions={this.state.nbQuestions}
                              nextQuestion={this.nextQuestion} finish={this.finish}
                              handleChange={this.handleChange} course={this.state.course}
                              postQuiz={this.postQuiz}>

                    </Question>
                </div>


            )
        } else {
            return (
                <div></div>
            )
        }

    }
}

export default CreateQuiz;


