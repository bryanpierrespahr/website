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

            return (
                <div>
                    <div className="row">
                        <div className="col-md-2">
                            <h5 className="text-left paddingTop10px">Question {this.props.index+1}</h5>
                        </div>
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="text-left paddingTop10px">{question.title}</h5>
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