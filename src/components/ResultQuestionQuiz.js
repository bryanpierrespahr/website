import React, {Component} from 'react';
import {FaRegSquare, FaRegCheckSquare} from 'react-icons/fa';
import Answer from './Answer'

class ResultQuestionQuiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false
        }
    }

    componentDidMount() {


        this.setState({
            question: this.props.question,
            result: this.props.result,
            indexQuestion: this.props.index,
        }, () => {
            this.setState({
                ready: true,
            })
        })

    }

    render() {

        if (this.state.ready) {
            const question = this.state.question;
            const result = this.state.result;

            const index = this.state.indexQuestion;
            const studentAnswer = result.studentAnswers[index];
            const correctAnswer = result.correctAnswers[index];

            if(studentAnswer == correctAnswer){
                return (
                    <div>
                        <div className="row">
                            <div className="col-md-2">
                                <h5 className="text-left paddingTop10px">Question {this.props.index + 1}</h5>
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className="text-left paddingTop10px">{question.title}</h5>
                                        {question.answers.map((answer) => {
                                            return <Answer answer={answer} index={this.state.indexQuestion} result={result}/>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 my-auto">
                                <img alt="result" src={require("../assets/correct.png")}
                                     width="64px"/>
                            </div>
                        </div>
                    </div>

                )
            }else{
                return (
                    <div>
                        <div className="row">
                            <div className="col-md-2">
                                <h5 className="text-left paddingTop10px">Question {this.props.index + 1}</h5>
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className="text-left paddingTop10px">{question.title}</h5>
                                        {question.answers.map((answer) => {
                                            return <Answer answer={answer} index={this.state.indexQuestion} result={result}/>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2  my-auto">
                                <img alt="result" src={require("../assets/incorrect.png")}
                                     width="64px"/>
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

export default ResultQuestionQuiz;