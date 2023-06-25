import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import './style.scss';

class userHeader extends Component {

    render() {
        const { processLogout, userInfo } = this.props;
        return (
            <div className="footer-body mt-5">
                <div className="footer-container">
                    <div className="container">
                        <footer className="pt-5 ">
                            <div className="row">
                                <div className="col-2">
                                    <h5>Menu</h5>
                                    <ul className="nav flex-column">
                                        <Link to="/home">
                                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
                                        </Link>
                                        <Link to="/blog">
                                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Blog</a></li>

                                        </Link>
                                        <li className="nav-item mb-2"><a href="https://github.com/levando20194017/projectCNW_learnprogramming-website" className="nav-link p-0 text-muted">Link github</a></li>
                                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Project</a></li>
                                    </ul>
                                </div>

                                <div className="col-2">
                                    <h5>Contact</h5>
                                    <ul className="nav flex-column">
                                        <li className="nav-item mb-2"><a href="https://www.facebook.com/levando.0708" className="nav-link p-0 text-muted"><i className="fab fa-facebook"
                                            style={{ color: "blue" }}> Facebook</i></a></li>
                                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted"><i className="fab fa-youtube"
                                            style={{ color: "red" }}> Youtube</i></a></li>
                                        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted"><i className="fab fa-twitter"
                                            style={{ color: "blue" }}> Twitter</i></a></li>
                                        <li className="nav-item mb-2"><i className="fas fa-phone-volume"></i> Phone: 0971565773</li>
                                    </ul>
                                </div>

                                <div className="col-2">
                                    <h5>Address</h5>
                                    <ul className="nav flex-column">
                                        <li className="nav-item mb-2">
                                            <p>1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội</p>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-4 offset-1">
                                    <form>
                                        <h5>Subscribe to our newsletter</h5>
                                        <p>Personal information search.</p>
                                        <div className="d-flex w-100 gap-2">
                                            <label htmlFor="newsletter1" className="visually-hidden">MSSV</label>
                                            <input id="newsletter1" type="text" className="form-control" placeholder="Search user by MSSV" />
                                            <button className="btn btn-primary" type="button">Search</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between py-4 my-4 border-top">

                            </div>
                            <br />
                            <br />
                            <div className="footer-title">
                                One love - One future
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(userHeader);
