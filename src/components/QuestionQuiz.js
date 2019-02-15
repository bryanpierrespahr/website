import React, {Component} from 'react';
import {FaRegSquare, FaRegCheckSquare} from 'react-icons/fa';

class QuestionQuiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false
        }
    }

    componentDidMount() {

        this.setState({
            question: this.props.question
        }, () => {
            this.setState({
                ready: true,
            })
        })

    }

    render() {

        if (this.state.ready) {

            const question = this.state.question;
            const nbCorrect = question.nbCorrect;
            const nbIncorrect = question.nbIncorrect;
            const answered = nbCorrect+nbIncorrect;
            const correctRate = nbCorrect / answered * 100;


            return (
                <div>
                    <div className="row">
                        <div className="col-md-2">
                            <h5 className="text-left paddingTop10px">Question {this.props.index + 1}</h5>
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="text-left paddingTop10px">{question.question}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="text-left">
                                        <FaRegCheckSquare></FaRegCheckSquare>
                                        <span className="questionAnswer">{question.correctAnswer}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="text-left">
                                        <FaRegSquare></FaRegSquare>
                                        <span className="questionAnswer">{question.incorrectAnswers[0]}</span>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="text-left">
                                        <FaRegSquare></FaRegSquare>
                                        <span className="questionAnswer">{question.incorrectAnswers[1]}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="text-left">
                                        <FaRegSquare></FaRegSquare>
                                        <span className="questionAnswer">{question.incorrectAnswers[2]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="text-left paddingTop10px">Statistics :</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="text-left">
                                        <span className="questionAnswer">Answered : {answered}</span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="text-left">
                                        <span className="questionAnswer">Correct : {nbCorrect}</span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="text-left">
                                        <span className="questionAnswer">Incorrect : {nbIncorrect}</span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="text-left">
                                        <span className="questionAnswer">Correct rate : {correctRate} %</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )
        } else {
            return (
                <div></div>
            )
        }

    }


}

export default QuestionQuiz;