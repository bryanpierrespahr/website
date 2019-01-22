import React, {Component} from 'react';
import API from '../utils/api.js';
import {FaQuestion} from 'react-icons/fa';

class QuizLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }

    componentDidMount() {

        API.getQuiz(this.props.id)
            .then(data => {
                var quiz = data.data;

                this.setState({
                    no: quiz.no,
                    weekNo: quiz.weekNo,
                    title: quiz.title,
                    quizId: quiz._id,
                })
            })
            .then(() => {
                this.setState({
                    ready: true
                })
            })
    }


    render() {
        if (this.state.ready) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="text-left weekContent">
                                <FaQuestion></FaQuestion>
                                <a className="marginLeft5px" href={'/quiz/'+this.state.quizId}>{this.state.title}</a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <p>{this.props.id}</p>
            )

        }

    }
}

export default QuizLink;