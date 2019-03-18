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
                                <img src={require("../assets/moodle-logo-large.png")} width="35%" alt="logo"/>
                            </div>
                        </div>
                    </div>
                    <ColoredLine color="#83C669" className="footer-line"/>
                    <div className="row ">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ">
                            <div className="footer-widget ">
                                <div className="footer-title">Company</div>
                                <ul className="list-unstyled">
                                    <li><a className="footer-links" href="#">About</a></li>
                                    <li><a className="footer-links" href="#">Contact us</a></li>
                                    <li><a className="footer-links" href="#">FAQ</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ">
                            <div className="footer-widget ">
                                <div className="footer-title">Quick Links</div>
                                <ul className="list-unstyled">
                                    <li><a className="footer-links" href="/courses">Courses</a></li>
                                    <li><a className="footer-links" href="/students">Students</a></li>
                                    <li><a className="footer-links" href="/teachers">Teachers</a></li>
                                    <li><a className="footer-links" href="/dashboard">Dashboard</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ">
                            <div className="footer-widget ">
                                <div className="footer-title">Social</div>
                                <ul className="list-unstyled">
                                    <li><a className="footer-links"
                                           href="https://twitter.com/haagaheliaamk">Twitter</a></li>
                                    <li><a className="footer-links"
                                           href="https://www.youtube.com/user/HAAGAHELIAviestinta">YouTube</a></li>
                                    <li><a className="footer-links" href="https://www.linkedin.com/company/haaga-helia-university-of-applied-sciences">Linked
                                        In</a></li>
                                    <li><a className="footer-links"
                                           href="https://www.facebook.com/HaagaHeliaAMK/">Facebook</a>
                                    </li>
                                    <li><a className="footer-links"
                                           href="https://www.instagram.com/haagahelia/">Instagram</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center ">
                            <div className="tiny-footer">
                                <p>Copyright © All Rights Reserved 2019 | <a
                                                                             href="https://github.com/bryanpierrespahr/"
                                                                             target="_blank" rel="noopener noreferrer"
                                                                             className="copyright-links">Bryan Spahr</a>
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
