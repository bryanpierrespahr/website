import React, {Component} from 'react';
import API from '../utils/api.js';
import {FaRegFilePdf} from 'react-icons/fa';
import {MdDeleteForever} from "react-icons/md";

class LectureLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }

    delete = (lectureId) => {

        console.log("lecture id : "+lectureId);
        console.log("week id : "+this.state.weekId);

        API.deleteLecture(lectureId)
            .then((data) => {
                    console.log(data.data);
                    console.log("LECTURE deleted")
                }
            )
            .then(() => {

                var lecturesId;
                API.getWeek(this.state.weekId)
                    .then(data => {

                        var week = data.data;
                        lecturesId = week.lecturesId;
                        var index = lecturesId.indexOf(this.state.lectureId);

                        if (index > -1)
                            lecturesId.splice(index, 1);

                    })

                    .then(() => {
                        API.patchLectureWeek(this.state.weekId, lecturesId).then((data) => {
                                console.log(data.data)
                            }
                        ).then(() => {
                            window.location = "/course/" + this.state.courseId;
                        })
                    })

            })

    }

    componentDidMount() {

        console.log("WWWWWWWW : >"+this.props.weekId);

        API.getLecture(this.props.id)
            .then(data => {

                var lecture = data.data;

                    console.log("LECTURE :" + JSON.stringify(lecture));

                    this.setState({
                        no: lecture.no,
                        weekNo: lecture.weekNo,
                        title: lecture.title,
                        link: lecture.link,
                        lectureId: this.props.id
                    })



            }).then(() => {
            this.setState({
                weekId: this.props.weekId,
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
                                <FaRegFilePdf></FaRegFilePdf>
                                <a className="marginLeft5px" href={this.state.link}>{this.state.title}</a>
                                <a className="deleteWeekContent" onClick={() => this.delete(this.state.lectureId)}
                                   id="hide"><MdDeleteForever size="20px"/></a>
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

export default LectureLink;