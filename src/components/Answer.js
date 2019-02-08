import React, {Component} from 'react';
import {FaRegSquare, FaRegCheckSquare} from 'react-icons/fa';

class Answer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }

    componentDidMount() {

        console.log(this.props.answer);

        this.setState({
            answer: this.props.answer,
            result: this.props.result,
        }, () => {
            this.setState({
                ready: true,
            })
        })

    }

    render() {

        if (this.state.ready) {

            const answer = this.state.answer;
            const correctAnswer = this.state.result.correctAnswers[this.props.index];
            const studentAnswer = this.state.result.studentAnswers[this.props.index];


            if (answer == studentAnswer && answer == correctAnswer) {

                return (
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-left">
                                <FaRegCheckSquare color="green"></FaRegCheckSquare>
                                <span className="questionAnswer">{this.state.answer}</span>
                            </div>
                        </div>

                    </div>
                )

            }

            else if (answer == studentAnswer && correctAnswer != studentAnswer) {

                console.log("student ans : "+studentAnswer)

                return (
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-left">
                                <FaRegCheckSquare color="red"></FaRegCheckSquare>
                                <span className="questionAnswer">{this.state.answer}</span>
                            </div>
                        </div>

                    </div>
                )
            }

            else if (answer != studentAnswer && answer == correctAnswer) {

                return (
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-left">
                                <FaRegCheckSquare color="blue"></FaRegCheckSquare>
                                <span className="questionAnswer">{this.state.answer}</span>
                            </div>
                        </div>

                    </div>
                )
            }

            else {

                return (
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-left">
                                <FaRegSquare></FaRegSquare>
                                <span className="questionAnswer">{this.state.answer}</span>
                            </div>
                        </div>

                    </div>
                )

            }


        } else {
            return (
                <div></div>
            )
        }

    }


}

export default Answer;