import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './style.scss'
import { getAllCourses } from '../../../services/courseService';
import { getAllLessons } from '../../../services/lessonService';
import { getAllVideos } from '../../../services/videoService';
import { Link } from 'react-router-dom';
import moment from 'moment';
class Learn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: [false],
            course: {},
            lessons: [],
            videosOfLesson: [],
            allVideos: [],
            videoShow: '',
            videoTitleShow: '',
            videoCreatedAt: ''
        }
    }
    userData = JSON.parse(localStorage.getItem("persist:user"));
    userInfo = JSON.parse(this.userData.userInfo);
    componentDidMount() {
        this.fetchData();
    }
    async fetchData() {
        try {

            const response = await getAllCourses(this.props.match.params.id);
            if (response && response.errCode === 0) {
                this.setState({ course: response.courses });
            }
            const responseOfLesson = await getAllLessons(this.props.match.params.id);
            if (responseOfLesson && responseOfLesson.errCode === 0) {
                this.setState({ lessons: responseOfLesson.lessons });
            }
            let videoArray = [];
            for (let i = 0; i < responseOfLesson.lessons.length; i++) {
                const responseVideosOfLesson = await getAllVideos(responseOfLesson.lessons[i].id);
                const videos = responseVideosOfLesson.videos;

                videoArray.push(videos);
            }
            this.setState({
                videosOfLesson: videoArray,
                videoShow: videoArray[0][0].video_url,
                videoTitleShow: videoArray[0][0].title,
                videoCreatedAt: videoArray[0][0].createdAt
            });

            const allVIDEO = await getAllVideos('ALL')
            if (allVIDEO && allVIDEO.errCode === 0) {
                this.setState({ allVideos: allVIDEO.videos });
            }
        } catch (error) {
            console.log(error);
        }
    }
    handleClick = (index) => {
        const copyState = [...this.state.isOpen];
        copyState[index] = !copyState[index]
        this.setState({
            isOpen: copyState
        })
    }
    handleShowVideo = (video_url, videoTitle, videoCreatedAt, index) => {
        this.setState({
            videoShow: video_url,
            videoTitleShow: videoTitle,
            videoCreatedAt: videoCreatedAt
        })
        const isActive = document.querySelector('.list-video_title.active')
        if (isActive) {
            isActive.classList.remove('active');
        }
        const videoTile = document.querySelectorAll('.list-video_title')
        if (videoTile && videoTile[index]) {
            videoTile[index].classList.add('active');
        }
    }

    render() {
        const { isOpen, course, lessons, videosOfLesson, allVideos, videoShow, videoTitleShow, videoCreatedAt } = this.state
        return (
            <div className='learn'>
                <div className='learn_header d-flex'>
                    <div className='d-flex learn_header-left'>
                        <Link to='/home'>
                            <i className="bi bi-chevron-left"></i>
                        </Link>
                        <Link to='/home'>
                            <div style={{ marginLeft: "20px" }}>
                                <img src={`${process.env.PUBLIC_URL}/assets/img/logo-symbol.png`} height={30} width={30} />
                            </div>
                        </Link>
                        <h6 style={{ marginLeft: "10px", paddingTop: "4px" }}>{course.title}</h6>
                    </div>
                    <div className='d-flex learn_header-right'>
                        <div>
                            <i className="bi bi-book-half"></i>
                            <span>0/{allVideos ? allVideos.length : "0"} bài học</span>
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
                        <iframe width="100%" height="600px" src={videoShow}
                            title="YouTube video player"
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                        <div className='learn_body-footer d-flex'>
                            <div className='learn_body-footer-title'>
                                <h4>{videoTitleShow}</h4>
                                <p style={{ fontSize: "14px" }}>Cập nhật {moment(`${videoCreatedAt}`).format('HH:mm DD/MM/YYYY')}.</p>
                            </div>
                            <div className='learn_body-note'>
                                <button><i className="bi bi-plus"></i> <span>Thêm ghi chú tại đây</span></button>
                            </div>
                        </div>
                    </div>
                    <div className='col-3 learn_body-right'>
                        <h6 className='content-lesson'>Nội dung khóa học</h6>
                        {lessons && lessons.map((lesson, index) => {
                            return (
                                <div>
                                    <div className='learn_body-right-lesson mt-3'>
                                        <div className='learn_body-right-lesson-title d-flex' onClick={() => this.handleClick(index)}>
                                            <div className='col-11' style={{ lineHeight: "0.8" }}>
                                                <h6>{lesson.orderBy} {lesson.title}</h6>
                                                <div style={{ fontSize: "13px" }}>0/{videosOfLesson[index] && videosOfLesson[index].length} | 07:07</div>
                                            </div>
                                            <div className='col-1'>
                                                {isOpen[index] ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}

                                            </div>
                                        </div>
                                    </div>
                                    {isOpen[index] && <div className='list-video'>
                                        {videosOfLesson[index] && videosOfLesson[index].map((video, videoIndex) => {
                                            return (
                                                <div className='list-video_title' style={{ lineHeight: "0.8" }}
                                                    onClick={() => this.handleShowVideo(video.video_url, video.title, video.createdAt, videoIndex)}>
                                                    <h6>{videoIndex + 1} {video.title}</h6>
                                                    <div>
                                                        <i class="bi bi-youtube"></i> <span>1:30</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>}
                                </div>
                            )
                        })}

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
