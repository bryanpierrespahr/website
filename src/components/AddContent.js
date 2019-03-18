import React, {Component} from 'react';
import {MdAdd} from 'react-icons/md';
import {Link} from 'react-router-dom';

class AddContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
    }

    componentDidMount() {


    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="text-left weekContent">
                            <MdAdd></MdAdd>
                            <Link className="addA" to={"/"+this.props.type+"/add"}>
                                Add a {this.props.type}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddContent;