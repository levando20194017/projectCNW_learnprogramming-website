import React, { Component } from 'react';

import { connect } from 'react-redux';

import './style-course-list.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllCourses } from '../../../services/courseService';
import { Link } from 'react-router-dom';

class CourseList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listCourses: [],
        }
    }
    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        try {
            const response = await getAllCourses('ALL');
            console.log(response);
            if (response && response.errCode === 0) {
                this.setState({ listCourses: response.courses });
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        const listCourses = this.state.listCourses
        return (
            <div className="CourseList">
                <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true"
                            aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <rect width="100%" height="100%" fill="#777" />
                            </svg>

                            <div className="container">
                                <div className="carousel-caption text-start">
                                    <h1>Example headline.</h1>
                                    <p>Some representative placeholder content for the first slide of the carousel.</p>
                                    <p><a className="btn btn-lg btn-primary" href="#">Sign up today</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <rect width="100%" height="100%" fill="#777" />
                            </svg>

                            <div className="container">
                                <div className="carousel-caption">
                                    <h1>Another example headline.</h1>
                                    <p>Some representative placeholder content for the second slide of the carousel.</p>
                                    <p><a className="btn btn-lg btn-primary" href="#">Learn more</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <rect width="100%" height="100%" fill="#777" />
                            </svg>

                            <div className="container">
                                <div className="carousel-caption text-end">
                                    <h1>One more for good measure.</h1>
                                    <p>Some representative placeholder content for the third slide of this carousel.</p>
                                    <p><a className="btn btn-lg btn-primary" href="#">Browse gallery</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <main>
                    <section className="home-cl section-padding">
                        <section className="popular-location section-padding">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="section-tittle text-center mb-40">
                                            <h2 className="display-2">Các khóa học Miễn phí</h2>
                                            <p>Tham gia các khóa học chất lượng nhất</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row course-list">
                                    {listCourses && listCourses.map((course, index) => {
                                        return (
                                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                                <div className="single-location mb-20">
                                                    <div className="location-img">
                                                        <img src={course.img_url} alt="" />
                                                    </div>
                                                    <Link to={`/course/${course.id}`}>
                                                        <div className="location-details">
                                                            <a href="#" className="location-btn">Xem khóa học</a>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <h6 style={{ marginTop: "-10px", fontWeight: "700" }}>{course.title}</h6>
                                                <div style={{ marginBottom: "40px", fontSize: "14px" }}>
                                                    <i className="bi bi-people-fill"></i> <span>576</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </section>

                    </section>
                </main>
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
