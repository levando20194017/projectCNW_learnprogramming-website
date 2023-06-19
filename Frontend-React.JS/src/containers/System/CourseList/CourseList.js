import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import HeaderAdmin from '../../Header/HeaderAdmin';
import './style-course-list.scss'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft  } from '@fortawesome/free-solid-svg-icons'



class CourseList extends Component {

    state = {

    }

    componentDidMount() {
    }



    render() {

        return (
            <div className="CourseList">

                <section className="home-cl section-padding">
                    <section className="popular-location section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-tittle text-center mb-40">
                                        <h2>Chào mừng bạn đến với CodeCrush</h2>
                                        <p>Tham gia các khóa học chất lượng</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                    <div className="single-location mb-20">
                                        <div className="location-img">
                                            <img src="/assets/img/gallery/example-course.png" alt="" />
                                        </div>
                                        <div className="location-details">
                                            <h4><a href="#">Programing</a></h4>
                                            <a href="#" className="location-btn">View Courses</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                    <div className="single-location mb-20">
                                        <div className="location-img">
                                            <img src="/assets/img/gallery/example-course.png" alt="" />
                                        </div>
                                        <div className="location-details">
                                            <h4><a href="#">VFX</a></h4>
                                            <a href="#" className="location-btn">View Courses</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                    <div className="single-location mb-20">
                                        <div className="location-img">
                                            <img src="/assets/img/gallery/example-course.png" alt="" />
                                        </div>
                                        <div className="location-details">
                                            <h4><a href="#">App Development</a></h4>
                                            <a href="#" className="location-btn">View Courses</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                    <div className="single-location mb-20">
                                        <div className="location-img">
                                            <img src="/assets/img/gallery/example-course.png" alt="" />
                                        </div>
                                        <div className="location-details">
                                            <h4><a href="#">Technology</a></h4>
                                            <a href="#" className="location-btn">View Courses</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                    <div className="single-location mb-20">
                                        <div className="location-img">
                                            <img src="/assets/img/gallery/example-course.png" alt="" />
                                        </div>
                                        <div className="location-details">
                                            <h4><a href="#">Graphics Design</a></h4>
                                            <a href="#" className="location-btn">View Courses</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                    <div className="single-location mb-20">
                                        <div className="location-img">
                                            <img src="/assets/img/gallery/example-course.png" alt="" />
                                        </div>
                                        <div className="location-details">
                                            <h4><a href="#">Music</a></h4>
                                            <a href="#" className="location-btn">View Courses</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                    <div className="single-location mb-20">
                                        <div className="location-img">
                                            <img src="/assets/img/gallery/example-course.png" alt="" />
                                        </div>
                                        <div className="location-details">
                                            <h4><a href="#">Product Design</a></h4>
                                            <a href="#" className="location-btn">View Courses</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                    <div className="single-location mb-20">
                                        <div className="location-img">
                                            <img src="/assets/img/gallery/example-course.png" alt="" />
                                        </div>
                                        <div className="location-details">
                                            <h4><a href="#">Video Editing</a></h4>
                                            <a href="#" className="location-btn">View Courses</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
