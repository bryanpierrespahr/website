import React, {Component} from 'react';
import {MdAdd} from 'react-icons/md';
import {Link} from 'react-router-dom';

//Component class to add a new lecture
class AddLecture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }

    componentDidMount() {

        this.setState({
            course: this.props.course,
            weekId: this.props.weekId,
            weekNo: this.props.weekNo,
            no: this.props.no,
        }, () => {
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
                                <MdAdd></MdAdd>
                                <Link to=
                                          {{
                                              pathname: "/" + this.props.type + "/add",
                                              courseId: this.state.course._id,
                                              weekId: this.state.weekId,
                                              weekNo: this.state.weekNo,
                                              no: this.state.no,
                                          }}
                                >
                                    Add a {this.props.type}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

}

export default AddLecture;


