import React, {Component} from 'react';

//Footer component that is always rendered (on every page)
class Footer extends Component {

    //Render method
    render() {

        //Create a custom colored line via the <hr> element
        const ColoredLine = ({color}) => (
            <hr
                style={{
                    color: color,
                    backgroundColor: color,
                    height: 1
                }}
            />
        );

        return (
            <div className="footer">
                <div className="container">
                    <div className="row ">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <div className="ft-logo">
                                <img src={require("../assets/moodle-logo.png")} width="135px" alt="logo"/>
                            </div>
                        </div>
                    </div>
                    <ColoredLine color="#A23F51" className="footer-line"/>
                    <div className="row ">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ">
                            <div className="footer-widget ">
                                <div className="footer-title">Company</div>
                                <ul className="list-unstyled">
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Contact us</a></li>
                                    <li><a href="#">FAQ</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ">
                            <div className="footer-widget ">
                                <div className="footer-title">Quick Links</div>
                                <ul className="list-unstyled">
                                    <li><a href="/courses">Courses</a></li>
                                    <li><a href="/students">Students</a></li>
                                    <li><a href="/teachers">Teachers</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ">
                            <div className="footer-widget ">
                                <div className="footer-title">Social</div>
                                <ul className="list-unstyled">
                                    <li><a href="https://twitter.com/AlphaFitnessFI">Twitter</a></li>
                                    <li><a href="https://plus.google.com/111334605642927884463">Google +</a></li>
                                    <li><a href="www.linkedin.com/in/alphafitness">Linked In</a></li>
                                    <li><a href="https://www.facebook.com/Alpha-Fitness-1088246158018276">Facebook</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center ">
                            <div className="tiny-footer">
                                <p>Copyright © All Rights Reserved 2018 | <a
                                    href="https://github.com/bryanpierrespahr/"
                                    target="_blank" rel="noopener noreferrer" className="copyrightlink">Bryan Spahr</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
