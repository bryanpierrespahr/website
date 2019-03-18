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

        console.log("Week : " + week);

        API.postWeek(week)
            .then((data) => {
                var newWeek = data.data.week;
                newWeekId = newWeek._id;

            })
            .then(() => {

                var weeksId = this.state.weeksId;

                weeksId.push(newWeekId);


                API.patchCourseWeek(this.state.courseId, weeksId)
                    .then((data) => {
                        console.log(data.data);
                    })
                    .then(() => {

                        this.refreshCourse(this.state.courseId);
                    })
                    .catch((error) => {
                        console.error(error);
                    })
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

        }, () => console.log("course refreshed"))

    }

    constructor(props) {
        super(props);
        this.state = {
            ready: false
        }
    }

    //Method that returns a custom "Participants" button
    participantsButton = (cell) => {

        return (

            <Link className="btn btn-warning" to=
                {{
                    pathname: "/course/edit",
                    param1: cell
                }}
            >
                Edit
            </Link>

        );
    };

    componentDidMount() {

        var courseId;

        courseId = this.props.location.pathname.split("/")[2];

        API.getCourse(courseId).then((data) => {

            var course = data.data;

            this.setState({
                courseId: courseId,
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
            }, () => console.log("weeks id "+this.state.weeksId));


        }).then(() => {
            this.setState({
                ready: true,
            })
        })

    }

    render() {

        if (this.state.ready) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2 className="courseTitle">{this.state.name}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-right">
                            <Link className="btn btn-custom" to=
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
                        <div className="col">
                            {
                                this.state.weeksId.map(weekId => {
                                    return <Week id={weekId} course={this.state.course}/>
                                })
                            }
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-12 move-left">
                            <button className="btn btn-custom btn-week" onClick={this.addWeek}>Add a week</button>
                        </div>

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