import React, { Component } from 'react';

import { connect } from 'react-redux';

import './style-course-list.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



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
                                            <h2 className="display-2">Các khóa học PRO</h2>
                                            <p>Tham gia các khóa học chất lượng nhất</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row course-list">
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                        <div className="single-location mb-20">
                                            <div className="location-img">
                                                <img src="/assets/img/courses/python.jpg" alt="" />
                                            </div>
                                            <div className="location-details">
                                                <h4><a href="#">Python</a></h4>
                                                <a href="#" className="location-btn">View Courses</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                        <div className="single-location mb-20">
                                            <div className="location-img">
                                                <img src="/assets/img/courses/fe.jpg" alt="" />
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
                                                <img src="/assets/img/courses/be.jpg" alt="" />
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
                                                <img src="/assets/img/courses/devops.jpeg" alt="" />
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
                                                <img src="/assets/img/courses/cyber-security.jpg" alt="" />
                                            </div>
                                            <div className="location-details">
                                                <h4><a href="#">Cyber Security</a></h4>
                                                <a href="#" className="location-btn">View Courses</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                        <div className="single-location mb-20">
                                            <div className="location-img">
                                                <img src="/assets/img/courses/android.jpg" />
                                            </div>
                                            <div className="location-details">
                                                <h4><a href="#"> Android </a> </h4>
                                                <a href="#" className="location-btn">View Courses</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                        <div className="single-location mb-20">
                                            <div className="location-img">
                                                <img src="/assets/img/courses/flutter.png" alt="" />
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
                                                <img src="/assets/img/courses/cpp.jpg" alt="" />
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


                        <section className="popular-location section-padding">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="section-tittle text-center mb-40">
                                            <h2 className="display-2">Các khóa học miễn phí</h2>
                                            <p>Xây dựng nền tảng chắc chắn</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row course-list">
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                        <div className="single-location mb-20">
                                            <div className="location-img">
                                                <img src="/assets/img/courses/html.jpg" alt="" />
                                            </div>
                                            <div className="location-details">
                                                <h4><a href="#">HTML</a></h4>
                                                <a href="#" className="location-btn">View Courses</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                        <div className="single-location mb-20">
                                            <div className="location-img">
                                                <img src="/assets/img/courses/css.jpg" alt="" />
                                            </div>
                                            <div className="location-details">
                                                <h4><a href="#">CSS</a></h4>
                                                <a href="#" className="location-btn">View Courses</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                        <div className="single-location mb-20">
                                            <div className="location-img">
                                                <img src="/assets/img/courses/js.png" alt="" />
                                            </div>
                                            <div className="location-details">
                                                <h4><a href="#">JavaScript</a></h4>
                                                <a href="#" className="location-btn">View Courses</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                        <div className="single-location mb-20">
                                            <div className="location-img">
                                                <img src="/assets/img/courses/c.jpg" alt="" />
                                            </div>
                                            <div className="location-details">
                                                <h4><a href="#">C</a></h4>
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
                                            <h2>Real story</h2>
                                            <p className="mb-20">
                                                "Khóa học lập trình web của website này là một lựa chọn tuyệt vời cho những người muốn bắt đầu học lập trình web. Khóa học bao gồm các ngôn ngữ và công cụ phổ biến nhất hiện nay, như HTML, CSS, JavaScript, Bootstrap, jQuery, PHP, MySQL và WordPress. Khóa học cũng giúp tôi hiểu được cách thiết kế và phát triển một trang web từ đầu đến cuối. Tôi rất khuyến khích các bạn tham gia khóa học này."
                                                <i>- Jone Kane </i>
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

                    <section className="about-area2 section-bg">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="offset-xxl-1 col-xxl-4 col-xl-5 col-lg-6 col-md-12">
                                    <div className="about-caption about-caption2">
                                        <div className="section-tittle mb-25">
                                            <h2>Become an Instructor</h2>
                                            <p className="mb-20">The automated process all your website tasks. Discover tools and techniques to engage effectively with vulnerable children and young people.</p>
                                        </div>
                                        <div className="single-features">
                                            <div className="features-icon">
                                                <img src="/assets/img/icon/tick.svg" alt="" />
                                            </div>
                                            <div className="features-caption">
                                                <p>Techniques to engage effectively with vulnerable children and young people.</p>
                                            </div>
                                        </div>
                                        <div className="single-features">
                                            <div className="features-icon">
                                                <img src="/assets/img/icon/tick.svg" alt="" />
                                            </div>
                                            <div className="features-caption">
                                                <p>Join millions of people from around the world learning together.</p>
                                            </div>
                                        </div>
                                        <div className="single-features mb-40">
                                            <div className="features-icon">
                                                <img src="/assets/img/icon/tick.svg" alt="" />
                                            </div>
                                            <div className="features-caption">
                                                <p>Join millions of people from around the world learning together.</p>
                                            </div>
                                        </div>
                                        <div className="slider-btns">
                                            <a data-animation="fadeInLeft" data-delay="1.0s" href="about.html" className="btn hero-btn mr-15">Become an Instructor</a>
                                            <a data-animation="fadeInRight" data-delay="1.0s" className="popup-video video-btn" href="https://www.youtube.com/watch?v=Wxdj970RM7M">
                                                <img src="/assets/img/icon/play-btn.svg" alt="" />
                                                Watch Video
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="offset-xl-1 col-xxl-5 col-xl-5 col-lg-6 col-md-12">
                                    <div className="about-img about-img2">
                                        <img src="/assets/img/person2.jpg" alt="" />
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
