import React, {Component} from 'react';
import API from '../utils/api.js';
import {FaLink} from 'react-icons/fa';

class LinkLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        }
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
                                <FaLink></FaLink>
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

export default LinkLink;