import React, {Component, Button} from 'react';
import API from '../utils/api.js';
import Week from './Week';
import {Link} from 'react-router-dom';

class Course extends Component {


    addWeek = () => {

        var newWeekId;
        var week = {
            "no": this.state.weeksId.length + 1,
            "lecturesId": [],
            "linksId": [],
            "quizzesId": [],
        }

        console.log(week);

        API.postWeek(week)
            .then((data) => {
                var newWeek = data.data.week;
                newWeekId = newWeek._id;
            })
            .then(() => {

                this.state.weeksId.push(newWeekId);

                API.patchCourseWeek(this.state.courseId, this.state.weeksId)
                    .then((data) => {
                        console.log(data.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            })
            .then(() => {
                this.refreshCourse(this.state.courseId);
            })
            .catch((error) => {
                console.error(error)
            })
    }
    refreshCourse = (courseId) => {

        API.getCourse(courseId).then((data) => {

            var course = data.data;

            this.setState({
                courseId: this.props.location.courseId,
                course: course,
                name: course.name,
                code: course.code,
                scope: course.scope,
                timing: course.timing,
                language: course.language,
                level: course.level,
                type: course.type,
                schedule: course.schedule,
                weeksId: course.weeksId
            })

        })

        this.setState({
            ready: true
        })

    }

    constructor(props) {
        super(props);
        this.state = {
            ready: false
        }
    }

    componentDidMount() {

        if (this.props.location.courseId != null) {

            API.getCourse(this.props.location.courseId).then((data) => {

                var course = data.data;

                this.setState({
                    courseId: this.props.location.courseId,
                    course: course,
                    name: course.name,
                    code: course.code,
                    scope: course.scope,
                    timing: course.timing,
                    language: course.language,
                    level: course.level,
                    type: course.type,
                    schedule: course.schedule,
                    weeksId: course.weeksId
                })


            }).then(() => {
                this.setState({
                    ready: true,
                })
            })

        } else {

            API.getCourse(this.props.match.params.courseName).then((data) => {

                var course = data.data;

                this.setState({
                    course: course,
                    name: course.name,
                    code: course.code,
                    scope: course.scope,
                    timing: course.timing,
                    language: course.language,
                    level: course.level,
                    type: course.type,
                    schedule: course.schedule,
                    weeksId: course.weeksId
                })


            }).then(() => {
                this.setState({
                    ready: true,
                })
            })
        }


    }

    render() {

        if (this.state.ready) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2>{this.state.name}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {
                                this.state.weeksId.map(weekId => {
                                    return <Week id={weekId} course={this.state.course}/>
                                })
                            }
                        </div>
                        <div>
                            <Link to=
                                      {{
                                          pathname: "/" + this.state.course._id + "/students",
                                          courseId: this.state.course._id,
                                          course: this.state.course
                                      }}
                            >
                                Participants
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <button onClick={this.addWeek}>Add a week</button>
                    </div>
                </div>

            )
        } else {
            return (
                <div>
                    <h1>Course </h1>
                    <h2>{this.state.name}</h2>
                </div>
            )
        }
    }

}

export default Course;