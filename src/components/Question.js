import React, {Component} from 'react';
import {TextInput, ValidationForm} from "react-bootstrap4-form-validation";
import {Button} from "react-bootstrap";

export class Question extends Component {

    //Handle the change on input fields
    inputChanged = (event) => {

        // console.log(event.target.name);
        // console.log(event.target.value);

        //Set the new value to the appropriate state
        this.setState({[event.target.name]: event.target.value})

        this.props.handleChange(event);

    }

    reset = () => {

        this.setState({
            question: '',
            correctAnswer: '',
            incorrectAnswer1: '',
            incorrectAnswer2: '',
            incorrectAnswer3: '',
        }, () => this.props.nextQuestion())


    }

    finish = () => {

        this.props.finish();
    }

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            correctAnswer: '',
            incorrectAnswer1: '',
            incorrectAnswer2: '',
            incorrectAnswer3: '',
        };

        console.log(props);
    }

    componentDidMount() {

        this.setState({
            course: this.props.course
        }, () => console.log(this.state.course))


    }

    render() {

        const nbQuestions = this.props.nbQuestions;

        if (this.props.questionNo < nbQuestions) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>Question</h4>
                        </div>
                    </div>
                    <div className="container">
                        <ValidationForm onErrorSubmit={this.handleErrorSubmit}>
                            <div className="col-md-8 mx-auto">
                                <div className="form-row">
                                    <div className="form-group col-md-12 mx-auto">
                                        <label htmlFor="question"
                                               className="float-left">Question {this.props.questionNo} / {this.props.nbQuestions}</label>
                                        <textarea className="form-control" id="question" cols="40" rows="2"
                                                  placeholder="Enter the question"
                                                  name="question" value={this.state.question}
                                                  onChange={this.inputChanged}
                                                  required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12 mx-auto">
                                        <label htmlFor="correctAnswer" className="float-left">Correct answer</label>
                                        <TextInput name="correctAnswer" className="form-control" id="correctAnswer"
                                                   placeholder="Enter correct answer"
                                                   value={this.state.correctAnswer} onChange={this.inputChanged}
                                                   required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12 mx-auto">
                                        <label htmlFor="incorrectAnswer1" className="float-left">Incorrect
                                            answer</label>
                                        <TextInput name="incorrectAnswer1" className="form-control"
                                                   id="incorrectAnswer1"
                                                   placeholder="Enter correct answer"
                                                   value={this.state.incorrectAnswer1} onChange={this.inputChanged}
                                                   required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12 mx-auto">
                                        <label htmlFor="incorrectAnswer2" className="float-left">Incorrect
                                            answer</label>
                                        <TextInput name="incorrectAnswer2" className="form-control"
                                                   id="incorrectAnswer2"
                                                   placeholder="Enter correct answer"
                                                   value={this.state.incorrectAnswer2} onChange={this.inputChanged}
                                                   required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12 mx-auto">
                                        <label htmlFor="incorrectAnswer3" className="float-left">Incorrect
                                            answer</label>
                                        <TextInput name="incorrectAnswer3" className="form-control"
                                                   id="incorrectAnswer3"
                                                   placeholder="Enter correct answer"
                                                   value={this.state.incorrectAnswer3} onChange={this.inputChanged}
                                                   required
                                        />
                                    </div>
                                </div>
                            </div>
                        </ValidationForm>
                        <Button
                            onClick={this.reset}
                            bsSize="large"
                            type="submit"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>Question</h4>
                        </div>
                    </div>
                    <div className="container">
                        <ValidationForm onErrorSubmit={this.handleErrorSubmit}>
                            <div className="col-md-8 mx-auto">
                                <div className="form-row">
                                    <div className="form-group col-md-12 mx-auto">
                                        <label htmlFor="question"
                                               className="float-left">Question {this.props.questionNo} / {this.props.nbQuestions}</label>
                                        <textarea className="form-control" id="question" cols="40" rows="2"
                                                  placeholder="Enter the question"
                                                  name="question" value={this.state.question}
                                                  onChange={this.inputChanged}
                                                  required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12 mx-auto">
                                        <label htmlFor="correctAnswer" className="float-left">Correct answer</label>
                                        <TextInput name="correctAnswer" className="form-control" id="correctAnswer"
                                                   placeholder="Enter correct answer"
                                                   value={this.state.correctAnswer} onChange={this.inputChanged}
                                                   required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12 mx-auto">
                                        <label htmlFor="incorrectAnswer1" className="float-left">Incorrect
                                            answer</label>
                                        <TextInput name="incorrectAnswer1" className="form-control"
                                                   id="incorrectAnswer1"
                                                   placeholder="Enter correct answer"
                                                   value={this.state.incorrectAnswer1} onChange={this.inputChanged}
                                                   required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12 mx-auto">
                                        <label htmlFor="incorrectAnswer2" className="float-left">Incorrect
                                            answer</label>
                                        <TextInput name="incorrectAnswer2" className="form-control"
                                                   id="incorrectAnswer2"
                                                   placeholder="Enter correct answer"
                                                   value={this.state.incorrectAnswer2} onChange={this.inputChanged}
                                                   required
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12 mx-auto">
                                        <label htmlFor="incorrectAnswer3" className="float-left">Incorrect
                                            answer</label>
                                        <TextInput name="incorrectAnswer3" className="form-control"
                                                   id="incorrectAnswer3"
                                                   placeholder="Enter correct answer"
                                                   value={this.state.incorrectAnswer3} onChange={this.inputChanged}
                                                   required
                                        />
                                    </div>
                                </div>
                            </div>
                        </ValidationForm>
                        <Button
                            onClick={this.finish}
                            bsSize="large"
                            type="submit"
                            className="btn btn-custom"
                        >
                            Finish
                        </Button>
                    </div>
                </div>
            )
        }


    }

}

export default Question;