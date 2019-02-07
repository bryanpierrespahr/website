import React, {Component} from 'react';

class Result extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className="row">
                <div className="col-md-6" >
                    <a href={`/quiz/${this.props.id}`}>{this.props.title}</a>
                </div>
                <div className="col-md-6">
                    <h5>{this.props.score}</h5>
                </div>

            </div>
        )
    }

}

export default Result;