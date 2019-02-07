import React, {Component} from 'react';
import API from '../utils/api.js';
import QuestionQuiz from "../components/QuestionQuiz"

class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false
        }
    }

    componentDidMount() {

        console.log(this.props.match.url.slice(6))
        API.getQuiz(this.props.match.url.slice(6))
            .then((data) => {

                var quiz = data.data
                console.log(quiz);

                this.setState({
                    quiz: quiz,
                })
            })
            .then(() => {
                this.setState({
                    ready: true,
                })
            })
            .catch((error) => {
                console.log(error)
            })

    }

    render() {

        if (this.state.ready) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="quizTitle">{this.state.quiz.title}</h3>
                        </div>

                    </div>
                    {this.state.quiz.questions.map((question, index) => {
                        return <QuestionQuiz question={question} index={index}/>
                    })}
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

}

export default Quiz;