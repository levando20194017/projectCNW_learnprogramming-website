import React, { Component } from 'react';

import { connect } from 'react-redux';

import './style-course-list.scss'


class CourseList extends Component {

    render() {

        return (
            <div className="CourseList">
                <header>
                    <div className="header-area">
                        <div className="main-header header-sticky">
                            <div className="container-fluid">
                                <div className="menu-wrapper d-flex align-items-center justify-content-between">
                                    <div className="left-content d-flex align-items-center">
                                        <div className="logo">
                                            <a href="index.html"><img src="/assets/img/logo-symbol.png" alt=""/></a>
                                        </div>
                                        <form action="#" className="form-box">
                                            <input type="text" name="Search" placeholder="Search courses.."/>
                                            <div className="search-icon">
                                                <i className="ti-search"></i>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="main-menu d-none d-lg-block">
                                        <nav>
                                            <ul id="navigation">
                                                <li><a href="index.html">Home</a></li>
                                                <li><a href="courses.html">Browse Courses</a></li>
                                                <li><a href="about.html">About</a></li>
                                                <li><a href="#">Blog</a>
                                                    <ul className="submenu">
                                                        <li><a href="blog.html">Blog</a></li>
                                                        <li><a href="blog_details.html">Blog Details</a></li>
                                                        <li><a href="elements.html">Element</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="contact.html">Contact</a></li>
                                                <li>
                                                    <a href="login.html" className="btn header-btn2">Sign In</a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mobile_menu d-block d-lg-none">
                                        <div className="slicknav_menu">
                                            <a href="#" aria-haspopup="true" role="button" tabIndex="0"
                                               className="slicknav_btn slicknav_collapsed" style={{outline: 'none'}}>
                                                <span className="slicknav_menutxt">MENU</span>
                                                <span className="slicknav_icon">
                  <span className="slicknav_icon-bar"></span>
                  <span className="slicknav_icon-bar"></span>
                  <span className="slicknav_icon-bar"></span>
                </span>
                                            </a>
                                            <ul className="slicknav_nav slicknav_hidden" aria-hidden="true" role="menu"
                                                style={{display: 'none'}}>
                                                <li><a href="index.html" role="menuitem" tabIndex="-1">Home</a></li>
                                                <li><a href="courses.html" role="menuitem" tabIndex="-1">Browse
                                                    Courses</a></li>
                                                <li><a href="about.html" role="menuitem" tabIndex="-1">About</a></li>
                                                <li className="slicknav_collapsed slicknav_parent">
                                                    <a href="#" role="menuitem" aria-haspopup="true" tabIndex="-1"
                                                       className="slicknav_item slicknav_row" style={{outline: 'none'}}>
                                                        <a href="#" tabIndex="-1">Blog</a>
                                                        <span className="slicknav_arrow">+</span>
                                                    </a>
                                                    <ul className="submenu slicknav_hidden" role="menu"
                                                        aria-hidden="true" style={{display: 'none'}}>
                                                        <li><a href="blog.html" role="menuitem" tabIndex="-1">Blog</a>
                                                        </li>
                                                        <li><a href="blog_details.html" role="menuitem" tabIndex="-1">Blog
                                                            Details</a></li>
                                                        <li><a href="elements.html" role="menuitem"
                                                               tabIndex="-1">Element</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="contact.html" role="menuitem" tabIndex="-1">Contact</a>
                                                </li>
                                                <li className="cart">
                                                    <a href="#" role="menuitem" tabIndex="-1"><span
                                                        className="flaticon-shopping-cart"></span></a>
                                                </li>
                                                <li>
                                                    <a href="login.html" className="btn header-btn2" role="menuitem"
                                                       tabIndex="-1">Sign In</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>


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
