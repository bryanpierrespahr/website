import React, {Component} from 'react';
import API from '../utils/api.js';
import ResultQuestionQuiz from "../components/ResultQuestionQuiz"

class QuizResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false
        }
    }

    componentDidMount() {

        var strings = this.props.match.url.split("/");

        var quizId = strings[2];
        var studentId = strings[4];

        console.log(strings);

        API.getQuiz(quizId)
            .then((data) => {

                var quiz = data.data

                this.setState({
                    quiz: quiz,
                })
            })
            .then(() => {

                API.getStudent(studentId)
                    .then((data) => {

                        var student = data.data;

                        for (var i = 0; i < student.courses.length; i++) {

                            var course = student.courses[i];
                            console.log("course : " + course.courseId)

                            for (var j = 0; j < course.quizResults.length; j++) {

                                var result = course.quizResults[j];

                                if (result.quizId == quizId) {

                                    this.setState({
                                        result: result
                                    })

                                } else {
                                    console.log("result quizid = " + result.quizId);
                                    console.log("quiz id " + quizId);
                                    console.log("pas egal")
                                }
                            }
                        }
                    })
                    .then(() => {
                        this.setState({
                            ready: true
                        })
                    })
            })

    }

    render() {

        if (this.state.ready) {

            const result = this.state.result;
            const quiz = this.state.quiz;

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="quizTitle">{quiz.title}</h3>
                        </div>
                    </div>
                    {result.questions.map((question, index) => {
                        return <ResultQuestionQuiz question={question} index={index} result={result}/>
                    })}
                </div>
            )
        } else {
            return (
                <div><h1>test</h1></div>
            )
        }
    }

}

export default QuizResult;