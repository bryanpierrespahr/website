import React, {Component} from 'react';
import API from '../utils/api.js';
import {FaLink} from 'react-icons/fa';
import {MdDeleteForever} from "react-icons/md";

class LinkLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }

    delete = (linkId) => {

        API.deleteQuiz(linkId)
            .then((data) => {
                    console.log(data.data);
                    console.log("link deleted")
                }
            )
            .then(() => {

                var linksId;
                API.getWeek(this.state.weekId)
                    .then(data => {

                        var week = data.data;
                        linksId = week.linksId;
                        var index = linksId.indexOf(linkId);

                        if (index > -1)
                            linksId.splice(index, 1);

                    })

                    .then(() => {
                        API.patchLinkWeek(this.state.weekId, linksId).then((data) => {
                                console.log(data.data)
                            }
                        ).then(() => {
                            window.location = "/course/" + this.state.course._id;
                        })
                    })

            })

    }

    componentDidMount() {

        API.getLink(this.props.id)
            .then(data => {
                var link = data.data;

                this.setState({
                    no: link.no,
                    weekNo: link.weekNo,
                    title: link.title,
                    link: link.link,
                    course: this.props.course
                })
            })
            .then(() => {
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
                                <FaLink></FaLink>
                                <a target="_blank" rel="noopener noreferrer" className="marginLeft5px" href={this.state.link}>{this.state.title}</a>
                                <a className="deleteWeekContent" onClick={() => this.delete(this.state.linkId)}
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

export default LinkLink;