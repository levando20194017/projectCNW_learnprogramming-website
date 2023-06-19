import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './style.scss'
class EnrollmentCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }
    handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div className='row course-detail' style={{ width: "100%" }}>
                <div className='col-7 offset-1 pt-5' >
                    <h3>HTML CSS từ Zero đến Hero</h3>
                    <p>Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee.</p>
                    <h5 className='mt-5'>Nội dung khóa học</h5>
                    <div>
                        <span><b>13</b> chương</span>
                        <span><b>166</b> bài học</span>
                        <span>thời lượng <b>30 giờ 27 phút</b></span>
                    </div>
                    <div className='course-title-detail mt-3' onClick={() => this.handleClick()}>
                        <div className='row d-flex'>
                            <div className='col-10 d-flex'>
                                {this.state.isOpen ? <i className="bi bi-dash"></i> : <i className="bi bi-plus"></i>}
                                <h6 style={{ paddingLeft: "10px", paddingTop: "5px" }}>1. Bắt đầu</h6>
                            </div>
                            <div className='col-2' style={{ fontSize: "14px" }}>
                                5 bài học
                            </div>
                        </div>
                    </div>
                    {this.state.isOpen && <div className='list-lession-of-course'>
                        <div className='lesson'>
                            <div className='col-11 d-flex' style={{ paddingLeft: "40px" }}>
                                <i className="bi bi-youtube"></i>
                                <p style={{ paddingLeft: "10px", paddingTop: "14px" }} className='text-secondary'>Bạn sẽ làm được gì sau khóa học?</p>
                            </div>
                            <div className='col-1'>
                                03:15
                            </div>
                        </div>
                        <div className='lesson'>
                            <div className='col-11 d-flex' style={{ paddingLeft: "40px" }}>
                                <i className="bi bi-youtube"></i>
                                <p style={{ paddingLeft: "10px", paddingTop: "14px" }} className='text-secondary'>Bạn sẽ làm được gì sau khóa học?</p>
                            </div>
                            <div className='col-1'>
                                03:15
                            </div>
                        </div>
                        <div className='lesson'>
                            <div className='col-11 d-flex' style={{ paddingLeft: "40px" }}>
                                <i className="bi bi-youtube"></i>
                                <p style={{ paddingLeft: "10px", paddingTop: "14px" }} className='text-secondary'>Bạn sẽ làm được gì sau khóa học?</p>
                            </div>
                            <div className='col-1'>
                                03:15
                            </div>
                        </div>
                        <div className='lesson'>
                            <div className='col-11 d-flex' style={{ paddingLeft: "40px" }}>
                                <i className="bi bi-youtube"></i>
                                <p style={{ paddingLeft: "10px", paddingTop: "14px" }} className='text-secondary'>Bạn sẽ làm được gì sau khóa học?</p>
                            </div>
                            <div className='col-1'>
                                03:15
                            </div>
                        </div>
                    </div>}


                    <h5 style={{ marginTop: "40px" }}>Yêu cầu</h5>
                    <div>
                        <i className="bi bi-check-lg"></i>
                        <span>Máy vi tính kết nối internet (Windows, Ubuntu hoặc MacOS)</span>
                    </div>
                    <div>
                        <i className="bi bi-check-lg"></i>
                        <span>Ý thức tự học cao, trách nhiệm cao, kiên trì bền bỉ không ngại cái khó</span>
                    </div>
                    <div>
                        <i className="bi bi-check-lg"></i>
                        <span>Không được nóng vội, bình tĩnh học, làm bài tập sau mỗi bài học</span>
                    </div>
                    <div>
                        <i className="bi bi-check-lg"></i>
                        <span>Khi học nếu có khúc mắc hãy tham gia hỏi/đáp tại group FB: Học lập trình web (fullstack.edu.vn)</span>
                    </div>
                    <div>
                        <i className="bi bi-check-lg"></i>
                        <span>Bạn không cần biết gì hơn nữa, trong khóa học tôi sẽ chỉ cho bạn những gì bạn cần phải biết</span>
                    </div>
                </div>

                <div className='col-4 p-4'>
                    <iframe width="450" style={{ borderRadius: "10px" }} height="315" src="https://www.youtube.com/embed/0SJE9dYdpps"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>
                    <div style={{ width: "450px" }} className='course-detail-right-body mt-3'>
                        <h2 style={{ color: "#f05123", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "400" }}>Miễn phí</h2>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <button className='enrollment'>ĐĂNG KÝ HỌC</button>
                        </div>
                        <div className='col-6 offset-4 mt-3'>
                            <div><i className="bi bi-water"></i><span>Trình độ cơ bản</span></div>
                            <div><i className="bi bi-film"></i><span>Tổng <b>209</b> bài học</span></div>
                            <div><i className="bi bi-clock-fill"></i><span>Thời lượng <b>29 giờ</b></span></div>
                            <div><i className="bi bi-film"></i><span> Học mọi lúc mọi nơi</span></div>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EnrollmentCourse);
