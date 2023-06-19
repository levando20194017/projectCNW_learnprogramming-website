import React, { Component } from 'react';

import { connect } from 'react-redux';

import './style-course-list.scss'


class CourseList extends Component {

    render() {

        return (
            <div className="CourseList">
                {/*header begin here*/}
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
                {/*header end here*/}

                {/*main begin here*/}
                <main>
                    <div className="slider-area slider-height">
                        <div className="slider-active slick-initialized slick-slider">
                            <div className="slick-list draggable">
                            <div className="hero-text">
                                <h1 className="display-1">Welcome to CodeCrush</h1>
                                <p></p>
                            </div>
                            </div>
                        </div>
                    </div>

                    <section className="home-cl section-padding">
                        <section className="popular-location section-padding">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="section-tittle text-center mb-40">
                                            <h2 className="display-2">Các chủ đề hot</h2>
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
                                                <h4><a href="#">Frontend</a></h4>
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
                                                <h4><a href="#">Backend</a></h4>
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
                                                <h4><a href="#">DevOps</a></h4>
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
                                                <h4><a href="#">Full Stack</a></h4>
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
                                                <h4><a href="#">Android</a></h4>
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
                                                <h4><a href="#">Flutter</a></h4>
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
                                                <h4><a href="#">C++</a></h4>
                                                <a href="#" className="location-btn">View Courses</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>

                    <section className="about-area1 about-area2 fix">
                        <div className="container">
                            <div className="row align-items-center section-overlay">
                                <div className="col-xxl-5 col-xl-5 col-lg-6 col-md-12">
                                    <div className="about-img about-img1">
                                        <img src="/assets/img/person1.jpg" alt="" />
                                    </div>
                                </div>
                                <div className="offset-xxl-1 col-xxl-5 col-xl-7 col-lg-6 col-md-12">
                                    <div className="about-caption about-caption1">
                                        <div className="section-tittle mb-25">
                                            <h2>The world’s largest selection of online courses</h2>
                                            <p className="mb-20">
                                                Millions of people have used Kingster to decide which online course to take. We aggregate courses from many universities to help you find the best courses on almost any subject, wherever they exist. Our goal is to make online education work for everyone.
                                            </p>
                                        </div>
                                        <div className="slider-btns">
                                            <a data-animation="fadeInLeft" data-delay="1.0s" href="about.html" className="btn hero-btn">Browse Courses</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                </main>
            {/*Main end here*/}
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
