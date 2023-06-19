import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './style.scss'
class Learn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenLesson: false
        }
    }
    handleClickOpenLesson = () => {
        this.setState({
            isOpenLesson: !this.state.isOpenLesson
        })
    }

    render() {
        return (
            <div className='learn'>
                <div className='learn_header d-flex'>
                    <div className='d-flex learn_header-left'>
                        <i className="bi bi-chevron-left"></i>
                        <div style={{ marginLeft: "20px" }}>
                            <img src={`${process.env.PUBLIC_URL}/assets/img/logo-symbol.png`} height={30} width={30} />
                        </div>
                        <h6 style={{ marginLeft: "10px", paddingTop: "4px" }}>Lập trình C++ cơ bản</h6>
                    </div>
                    <div className='d-flex learn_header-right'>
                        <div>
                            <i className="bi bi-book-half"></i>
                            <span>0/138 bài học</span>
                        </div>
                        <div>
                            <i className="bi bi-journal-bookmark"></i>
                            <span>Ghi chú</span>
                        </div>
                        <div>
                            <i className="bi bi-question-circle-fill"></i>
                            <span>Hướng dẫn</span>
                        </div>
                    </div>
                </div>
                <div className='learn_body d-flex'>
                    <div className='col-9 learn_body-left'>
                        <iframe width="100%" height="600px" src="https://www.youtube.com/embed/Da1tpV9TMU0"
                            title="YouTube video player"
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                        <div className='learn_body-footer d-flex'>
                            <div className='learn_body-footer-title'>
                                <h4>Giới thiệu khóa học</h4>
                                <p style={{ fontSize: "14px" }}>Cập nhật tháng 2 năm 2023</p>
                            </div>
                            <div className='learn_body-note'>
                                <button><i className="bi bi-plus"></i> <span>Thêm ghi chú tại đây</span></button>
                            </div>
                        </div>
                    </div>
                    <div className='col-3 learn_body-right'>
                        <h6 className='content-lesson'>Nội dung khóa học</h6>
                        <div className='learn_body-right-lesson mt-3'>
                            <div className='learn_body-right-lesson-title d-flex' onClick={() => this.handleClickOpenLesson()}>
                                <div className='col-11' style={{ lineHeight: "0.8" }}>
                                    <h6>1. Giới thiệu khóa học</h6>
                                    <div style={{ fontSize: "13px" }}>0/3 | 07:07</div>
                                </div>
                                <div className='col-1'>
                                    {this.state.isOpenLesson ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}

                                </div>
                            </div>
                        </div>
                        {this.state.isOpenLesson && <div className='list-video'>
                            <div className='list-video_title' style={{ lineHeight: "0.8" }}>
                                <h6>1. Giới thiệu khóa học</h6>
                                <div>
                                    <i class="bi bi-youtube"></i> <span>1:30</span>
                                </div>
                            </div>
                            <div className='list-video_title' style={{ lineHeight: "0.8" }}>
                                <h6>1. Giới thiệu khóa học</h6>
                                <div>
                                    <i class="bi bi-youtube"></i> <span>1:30</span>
                                </div>
                            </div>
                            <div className='list-video_title' style={{ lineHeight: "0.8" }}>
                                <h6>1. Giới thiệu khóa học</h6>
                                <div>
                                    <i class="bi bi-youtube"></i> <span>1:30</span>
                                </div>
                            </div>
                            <div className='list-video_title' style={{ lineHeight: "0.8" }}>
                                <h6>1. Giới thiệu khóa học</h6>
                                <div>
                                    <i class="bi bi-youtube"></i> <span>1:30</span>
                                </div>
                            </div>
                            <div className='list-video_title' style={{ lineHeight: "0.8" }}>
                                <h6>1. Giới thiệu khóa học</h6>
                                <div>
                                    <i class="bi bi-youtube"></i> <span>1:30</span>
                                </div>
                            </div>
                        </div>}

                    </div>
                </div>
                <div className='learn_footer'>
                    <div className='lesson_pre'>
                        <i className="bi bi-chevron-left"></i>
                        <span>BÀI TRƯỚC</span>
                    </div>
                    <div className='lesson_next'>
                        <i className="bi bi-chevron-right"></i>
                        <span>BÀI TIẾP THEO</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Learn);
