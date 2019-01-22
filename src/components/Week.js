import React, {Component} from 'react';
import API from '../utils/api.js';
import LectureLink from './LectureLink';
import LinkLink from './LinkLink';
import QuizLink from './QuizLink';
import AddContent from './AddContent';

class Week extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false
        }
    }

    componentDidMount() {

        console.log(this.props.id);

        API.getWeek(this.props.id)
            .then(data => {

                var week = data.data;

                this.setState({
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
                                return <LectureLink id={lectureId}/>
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <AddContent type="lecture"></AddContent>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {this.state.linksId.map(linkId => {
                                return <LinkLink id={linkId}/>
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <AddContent type="link"></AddContent>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {this.state.quizzesId.map(quizId => {
                                return <QuizLink id={quizId}/>
                            })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <AddContent type="quiz"></AddContent>
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