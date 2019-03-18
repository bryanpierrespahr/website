import React, {Component} from 'react';
import API from '../utils/api.js';
import LectureLink from './LectureLink';
import LinkLink from './LinkLink';
import QuizLink from './QuizLink';
import AddQuiz from "./AddQuiz";
import AddLink from "./AddLink";
import AddLecture from "./AddLecture";

class Week extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false
        }
    }

    componentDidMount() {

        console.log("props id : "+this.props.id)
        API.getWeek(this.props.id)
            .then(data => {

                var week = data.data;
                console.log("Week : "+JSON.stringify(week));

                this.setState({
                    course: this.props.course,
                    no: week.no,
                    lecturesId: week.lecturesId,
                    linksId: week.linksId,
                    quizzesId: week.quizzesId
                }, () => console.log("Lectures : "+this.state.lecturesId))
            })
            .then(() => {
                this.setState({
                    ready: true,
                    weekId: this.props.id
                })
            })
    }

    render() {

        console.log("Lectures : "+this.state.lecturesId);

        console.log("LeYYYYYYYYYYYYYYYYYYYYYYYYYYctures : "+this.state.weekId);

        if (this.state.ready) {
            return (
                <div className="container containerWeek">
                    <div className="row">
                        <div className="col">
                            <h4 className="text-left weekTitle">Week {this.state.no}</h4>
                        </div>
                    </div>
                    <div className="row weekRow">
                        <div className="col">
                            {this.state.lecturesId.map(lectureId => {
                                return <LectureLink weekId={this.state.weekId}  id={lectureId} course={this.state.course}/>
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <AddLecture weekId={this.props.id} weekNo={this.state.no} no={this.state.lecturesId.length+1} type="lecture" course={this.state.course}></AddLecture>
                        </div>
                    </div>
                    <div className="row weekRow">
                        <div className="col">
                            {this.state.linksId.map(linkId => {
                                return <LinkLink weekId={this.state.weekId} id={linkId} course={this.state.course}/>
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <AddLink weekId={this.props.id} weekNo={this.state.no} no={this.state.linksId.length+1} type="link" course={this.state.course}></AddLink>
                        </div>
                    </div>
                    <div className="row weekRow">
                        <div className="col">
                            {this.state.quizzesId.map(quizId => {
                                return <QuizLink weekId={this.state.weekId} id={quizId} course={this.state.course}/>
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

                </div>
            )
        }
    }

}

export default Week;