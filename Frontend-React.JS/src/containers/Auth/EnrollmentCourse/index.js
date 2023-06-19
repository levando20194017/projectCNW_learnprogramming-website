import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './style.scss'
class ForgotPassword extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='row course-detail-right' style={{ width: "100%" }}>
                <div className='col-7 offset-1 pt-5' >
                    <h3>HTML CSS từ Zero đến Hero</h3>
                    <p>Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee.</p>
                    <h5>Nội dung khóa học</h5>
                    <div className='course-title-detail'>
                        <div className='row d-flex'>
                            <div className='col-10 d-flex'>
                                <i className="bi bi-plus"></i>
                                <h6 style={{ marginLeft: "10px" }}>1. Bắt đầu</h6>
                            </div>
                            <div className='col-2'>
                                5 bài học
                            </div>
                        </div>
                    </div>
                    <div className='list-lession-of-course'>
                    </div>
                </div>
                <div className='col-4 p-4'>
                    <iframe width="450" style={{ borderRadius: "10px" }} height="315" src="https://www.youtube.com/embed/0SJE9dYdpps"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen>
                    </iframe>
                    <div style={{ width: "450px" }} className='course-detail-right-body'>
                        <h2 style={{ color: "orange", display: "flex", justifyContent: "center", alignItems: "center" }}>Miễn phí</h2>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <button className='btn btn-primary'>ĐĂNG KÝ HỌC</button>
                        </div>
                        <div className='col-6 offset-4 mt-3'>
                            <div><i className="bi bi-water"></i> Trình độ cơ bản</div>
                            <div><i className="bi bi-film"></i> Tổng 209 bài học</div>
                            <div><i className="bi bi-clock-fill"></i> Thời lượng 29 giờ</div>
                            <div><i className="bi bi-film"></i> Học mọi lúc mọi nơi</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
