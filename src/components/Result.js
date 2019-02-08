import React, {Component} from 'react';

class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {ready: false}
    }

    componentDidMount() {

        this.setState({
            result: this.props.result,
            studentId: this.props.studentId,
            ready: true,
        })

    }

    render() {

        if (this.state.ready) {

            const result = this.state.result;
            const studentId = this.state.studentId;
            return (

                <div className="row">
                    <div className="col-md-6">
                        <a href={`/quiz/${result.quizId}/student/${studentId}`}>{result.title}</a>
                    </div>
                    <div className="col-md-6">
                        <h5>{result.score}</h5>
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

export default Result;