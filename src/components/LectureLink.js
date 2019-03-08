import React, {Component} from 'react';
import API from '../utils/api.js';
import {FaRegFilePdf} from 'react-icons/fa';

class LectureLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }

    componentDidMount() {


        API.getLecture(this.props.id)
            .then(data => {
                var lecture = data.data;

                this.setState({
                    no: lecture.no,
                    weekNo: lecture.weekNo,
                    title: lecture.title,
                    link: lecture.link,
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
                                <FaRegFilePdf></FaRegFilePdf>
                                <a className="marginLeft5px" href={this.state.link}>{this.state.title}</a>
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