import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './style.scss'
import { getAllCourses } from '../../../services/courseService';
import { getAllLessons } from '../../../services/lessonService';
import { getAllVideos } from '../../../services/videoService';
import { enrrollmentCourse, getAllUsersEnrollment } from '../../../services/enrollmentCourse';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
class EnrollmentCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: [false],
            course: {},
            lessons: [],
            videosOfLesson: [],
            allVideos: []
        }
    }
    userData = JSON.parse(localStorage.getItem("persist:user"));
    userInfo = JSON.parse(this.userData.userInfo);
    componentDidMount() {
        this.fetchData();
    }
    handleEnrollmentCourse = async () => {
        const response = await enrrollmentCourse(this.props.match.params.id, this.userInfo.id);
        console.log(response);
        if (response && response.errCode === 0) {
            toast.success(<div style={{ width: "300px", fontSize: "14px" }}><i className="fas fa-check-circle"></i> Register course success!</div>, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            this.props.history.push(`/learn/${this.props.match.params.id}`);
        } else if (response && response.errCode === 1) {
            toast.info(<div style={{ width: "300px", fontSize: "14px" }}><i className="bi bi-info-circle"></i> You have already register this course!</div>, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } else {
            toast.error(<div style={{ width: "300px", fontSize: "14px" }}><FontAwesomeIcon icon={faExclamationTriangle} /> Register course failed!</div>, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }
    async fetchData() {
        try {
            const responseOfUserRegister = await getAllUsersEnrollment(this.props.match.params.id)
            console.log(responseOfUserRegister);
            const isRegister = responseOfUserRegister.usersOfRegister.some(item => item?.userID === this.userInfo.id);
            console.log(isRegister);
            if (isRegister) {
                this.props.history.push(`/learn/${this.props.match.params.id}`);
            } else {
                const response = await getAllCourses(this.props.match.params.id);
                if (response && response.errCode === 0) {
                    this.setState({ course: response.courses });
                }
                const responseOfLesson = await getAllLessons(this.props.match.params.id);
                if (responseOfLesson && responseOfLesson.errCode === 0) {
                    const arrLessons = responseOfLesson.lessons.sort((a, b) => a.orderBy - b.orderBy)
                    this.setState({ lessons: arrLessons });
                }
                let videoArray = [];
                for (let i = 0; i < responseOfLesson.lessons.length; i++) {
                    const responseVideosOfLesson = await getAllVideos(responseOfLesson.lessons[i].id);
                    const sortVideos = responseVideosOfLesson.videos.sort((a, b) => a.orderBy - b.orderBy)
                    videoArray.push(sortVideos);
                }
                this.setState({
                    videosOfLesson: videoArray,
                });

                const allVIDEO = await getAllVideos('ALL')
                if (allVIDEO && allVIDEO.errCode === 0) {
                    this.setState({ allVideos: allVIDEO.videos });
                }
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
    render() {
        const { isOpen, course, lessons, videosOfLesson, allVideos } = this.state
        return (
            <div className='row course-detail' style={{ width: "100%" }}>
                <div className='col-7 offset-1 pt-5' >
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <h5 className='mt-5'>Nội dung khóa học</h5>
                    <div>
                        <span><b>{lessons ? lessons.length : '0'}</b> chương</span>
                        <span><b>{allVideos ? allVideos.length : "0"}</b> bài học</span>
                        <span>thời lượng <b>30 giờ 27 phút</b></span>
                    </div>
                    {lessons && lessons.map((lesson, index) => {
                        return (
                            <div>
                                <div className='course-title-detail mt-3' onClick={() => this.handleClick(index)}>
                                    <div className='row d-flex'>
                                        <div className='col-10 d-flex'>
                                            {isOpen[index] ? <i className="bi bi-dash"></i> : <i className="bi bi-plus"></i>}
                                            <h6 style={{ paddingLeft: "10px", paddingTop: "5px" }}>{lesson.orderBy}. {lesson.title}</h6>
                                        </div>
                                        <div className='col-2' style={{ fontSize: "14px" }}>
                                            {videosOfLesson[index] ? (`${videosOfLesson[index].length} bài học`) : "0 bài học"}
                                        </div>
                                    </div>
                                </div>
                                {isOpen[index] && <div className='list-lession-of-course'>
                                    {videosOfLesson[index] && videosOfLesson[index].map((video) => {
                                        return (
                                            <div className='lesson'>
                                                <div className='col-11 d-flex' style={{ paddingLeft: "40px" }}>
                                                    <i className="bi bi-youtube"></i>
                                                    <p style={{ paddingLeft: "10px", paddingTop: "14px" }} className='text-secondary'>{video.title}</p>
                                                </div>
                                                <div className='col-1'>
                                                    03:15
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>}

                            </div>
                        )
                    })}

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
                            <button className='enrollment' onClick={this.handleEnrollmentCourse}>ĐĂNG KÝ HỌC</button>
                        </div>
                        <div className='col-6 offset-4 mt-3'>
                            <div><i className="bi bi-water"></i><span>Trình độ cơ bản</span></div>
                            <div><i className="bi bi-film"></i><span>Tổng <b>{allVideos ? allVideos.length : '0'}</b> bài học</span></div>
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
