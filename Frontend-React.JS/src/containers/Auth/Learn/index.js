import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss'
import { getAllCourses } from '../../../services/courseService';
import { getAllLessons } from '../../../services/lessonService';
import { getAllVideos } from '../../../services/videoService';
import { Link } from 'react-router-dom';
import moment from 'moment';
import YouTube from 'react-youtube';
class Learn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: [false],
            course: {},
            lessons: [],
            allVideos: [],
            videoShow: '',
            videoTitleShow: '',
            videoCreatedAt: '',
            time: 0,
            timerId: null,
            listVideos: [],
            lesssonIndex: 0,
            videoIndexOfLesson: 0
        }
        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
    }
    userData = JSON.parse(localStorage.getItem("persist:user"));
    userInfo = JSON.parse(this.userData.userInfo);
    sumTimes(arr) {
        const totalSeconds = arr.reduce((total, time) => {
            const [minutes, seconds] = time.duration.split(':').map(Number);
            return total + minutes * 60 + seconds;
        }, 0);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours === 0) {
            return `${minutes}:${String(seconds).padStart(2, '0')}`;
        } else {
            return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }
    convertTimeToSeconds(timeString) {
        const timeArray = timeString?.split(':').reverse();
        let seconds = 0;
        for (let i = 0; i < timeArray?.length; i++) {
            seconds += parseInt(timeArray[i], 10) * Math.pow(60, i);
        }
        return seconds;
    }
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
                const arrLessons = responseOfLesson.lessons.sort((a, b) => a.orderBy - b.orderBy);
                const promises = arrLessons.map(async (lesson) => {
                    const responseVideosOfLesson = await getAllVideos(lesson.id);
                    const sortVideos = responseVideosOfLesson.videos.sort((a, b) => a.orderBy - b.orderBy);
                    const promises = sortVideos.map((video) => {
                        const videoId = video.video_url;
                        const apiKey = process.env.REACT_APP_API_Key_Youtube;
                        const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${apiKey}`;
                        return fetch(url)
                            .then(response => response.json())
                            .then(data => {
                                const duration = data.items[0].contentDetails.duration;
                                const timeRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
                                const match = duration.match(timeRegex);
                                let timeString = '';
                                if (match) {
                                    const hours = parseInt(match[1]) || 0;
                                    const minutes = parseInt(match[2]) || 0;
                                    const seconds = parseInt(match[3]) || 0;
                                    if (hours > 0) {
                                        timeString += hours.toString().padStart(2, '0') + ':';
                                    }
                                    timeString += minutes.toString().padStart(2, '0') + ':';
                                    timeString += seconds.toString().padStart(2, '0');
                                }
                                video.duration = timeString; // thời lượng của 1 video
                                this.state.listVideos.push(video)
                                return video;
                            });
                    });
                    const videos = await Promise.all(promises);
                    lesson.duration = this.sumTimes(videos);
                    lesson.listVideos = videos;
                    return lesson;
                });
                const lessons = await Promise.all(promises);
                lessons.totalTime = this.sumTimes(lessons);

                const allvideo = lessons.reduce((total, lesson) => {
                    return total + lesson.listVideos.length
                }, 0)
                this.setState({
                    lessons: lessons,
                    videoShow: lessons[0].listVideos[0].video_url,
                    videoTitleShow: lessons[0].listVideos[0].title,
                    videoCreatedAt: lessons[0].listVideos[0].createdAt,
                    allVideos: allvideo
                });
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
    handleShowVideo = (video_url, videoTitle, videoCreatedAt, videoIndex, lessonIndex) => {
        clearInterval(this.state.timerId);
        this.setState({ timerId: null });
        this.setState({
            videoShow: video_url,
            videoTitleShow: videoTitle,
            videoCreatedAt: videoCreatedAt,
            time: 0,
            lessonIndex: lessonIndex,
            videoIndexOfLesson: videoIndex
        })
        const isActive = document.querySelector('.list-video_title.active')
        if (isActive) {
            isActive.classList.remove('active');
        }
        const videoTile = document.querySelectorAll('.list-video_title')
        if (videoTile && videoTile[videoIndex]) {
            videoTile[videoIndex].classList.add('active');
        }
    }
    onPlay(lessonIndex, videoIndex) {
        console.log('play');
        const timerId = setInterval(() => {
            this.setState({ time: this.state.time + 1 });
        }, 1000);
        this.setState({ timerId });
        const durationOfVideo = this.convertTimeToSeconds(this.state.lessons[lessonIndex]?.listVideos[videoIndex]?.duration)

        const completedPercent = this.state.time / durationOfVideo * 100
        console.log(completedPercent);

    }

    onPause(lessonIndex, videoIndex) {
        console.log('pause');
        clearInterval(this.state.timerId);
        this.setState({ timerId: null });
    }
    render() {
        const { isOpen, course, lessons, allVideos, videoShow, videoTitleShow, videoCreatedAt, lessonIndex, videoIndexOfLesson } = this.state
        const opts = {
            height: '600',
            width: '100%',
            playerVars: {
                autoplay: 1,
                controls: 1,
            },
        };
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
                            <span>0/{allVideos} bài học</span>
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
                        <YouTube videoId={videoShow} opts={opts}
                            onPlay={() => this.onPlay(lessonIndex, videoIndexOfLesson)}
                            onPause={() => this.onPause(lessonIndex, videoIndexOfLesson)} />
                        <div>
                            {this.state.time} seconds
                        </div>
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
                                                <h6>{index + 1} {lesson.title}</h6>
                                                <div style={{ fontSize: "13px" }}>0/{lesson.listVideos && lesson.listVideos.length} | {lesson.duration}</div>
                                            </div>
                                            <div className='col-1'>
                                                {isOpen[index] ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}

                                            </div>
                                        </div>
                                    </div>
                                    {isOpen[index] && <div className='list-video'>
                                        {lesson.listVideos && lesson.listVideos.map((video, videoIndex) => {
                                            return (
                                                <div className='list-video_title' style={{ lineHeight: "0.8" }}
                                                    onClick={() => this.handleShowVideo(video.video_url, video.title, video.createdAt, videoIndex, index)}>
                                                    <h6>{videoIndex + 1} {video.title}</h6>
                                                    <div>
                                                        <i class="bi bi-youtube"></i> <span>{video.duration}</span>
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
