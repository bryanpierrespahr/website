import React, {Component} from 'react';
import API from '../utils/api.js';
import LectureLink from './LectureLink';
import LinkLink from './LinkLink';
import QuizLink from './QuizLink';
import AddContent from './AddContent';
import AddQuiz from "./AddQuiz";

class Week extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false
        }
    }

    componentDidMount() {

        API.getWeek(this.props.id)
            .then(data => {

                var week = data.data;

                this.setState({
                    course: this.props.course,
                    no: week.no,
                    lecturesId: week.lecturesId,
                    linksId: week.linksId,
                    quizzesId: week.quizzesId
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
                            <h4 className="text-left weekTitle">Week {this.state.no}</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {this.state.lecturesId.map(lectureId => {
                                return <LectureLink id={lectureId} course={this.state.course}/>
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <AddContent type="lecture" course={this.state.course}></AddContent>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {this.state.linksId.map(linkId => {
                                return <LinkLink id={linkId} course={this.state.course}/>
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <AddContent type="link" course={this.state.course}></AddContent>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {this.state.quizzesId.map(quizId => {
                                return <QuizLink id={quizId} course={this.state.course}/>
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <AddQuiz weekId={this.props.id} weekNo={this.state.no} no={this.state.quizzesId.length+1} type="quiz" course={this.state.course} ></AddQuiz>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Week {this.state.no}</h1>
                </div>
            )
        }
    }

}

export default Week;