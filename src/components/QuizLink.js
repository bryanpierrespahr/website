import React, {Component} from 'react';
import API from '../utils/api.js';
import {FaQuestion} from 'react-icons/fa';
import {MdDeleteForever} from 'react-icons/md';

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
                    weekId: this.props.weekId,
                    ready: true
                })
            })
    }

    delete = (quizId) => {

        API.deleteQuiz(quizId)
            .then((data) => {
                    console.log(data.data);
                    console.log("quiz deleted")
                }
            )
            .then(() => {

                var quizzesId;
                API.getWeek(this.state.weekId)
                    .then(data => {

                        var week = data.data;
                        quizzesId = week.quizzesId;
                        var index = quizzesId.indexOf(this.state.quizId);

                        if (index > -1)
                            quizzesId.splice(index, 1);

                    })

                    .then(() => {
                        API.patchQuizWeek(this.state.weekId, quizzesId).then((data) => {
                                console.log(data.data)
                            }
                        ).then(() => {
                            window.location = "/course/" + this.state.courseId;
                        })
                    })

            })

    }


    render() {
        if (this.state.ready) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-left weekContent">
                                <FaQuestion></FaQuestion>
                                <a className="marginLeft5px" href={'/quiz/' + this.state.quizId}>{this.state.title}</a>
                                <a className="deleteWeekContent" onClick={() => this.delete(this.state.quizId)}
                                   id="hide"><MdDeleteForever size="20px"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div/>
            )

        }

    }
}

export default QuizLink;