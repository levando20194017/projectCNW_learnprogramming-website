import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CourseManage.scss'
import { getAllCourses, createNewCourseService, editCourseService, deleteCourseService } from '../../../services/courseService';
import { getAllLessons, createNewLessonService, editLessonService, deleteLessonService } from '../../../services/lessonService';
import { emitter } from '../../../utils/emitter';
import ModalCourse from './ModalCourse';
import ModalEditCourse from './ModalEditCourse';
import ModalLesson from './ModalLesson';
import { Scrollbars } from 'react-custom-scrollbars';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FaEllipsisH, FaEdit, FaTrash } from 'react-icons/fa';
import ModalEditLesson from './ModalEditLesson';

import {
    setAllCourses,
    setAllLessons,
    setOpenModal,
    setOpenEditModal,
    setOpenModalLesson,
    setOpenEditModalLesson,
    setCourseId,
    setLessonId
} from "../../../store/actions/courseActions";
import courseReducer from '../../../store/reducers/courseReducer';
import '../../../assets/css/app.scss'
class CourseManage extends Component {

    constructor(props) {
        super(props);

    }
    handleCourseClick = (courseBodys, index, courses, course) => {
        const $ = document.querySelector.bind(document);
        const isOpen = $('.course-body.hide');
        const isActive = $('.course-title.active');
        const isOpenMenu = Array.from(courseBodys).indexOf(isOpen);
        if (isOpenMenu == index) {
            isOpen.classList.remove('hide')
            isActive.classList.remove('active')
        } else {
            if (isOpen) {
                isOpen.classList.remove('hide');
                isActive.classList.remove('active')
            }
            course.classList.add('active')
            courseBodys[index].classList.add('hide')
        }
    }
    handleLessonClick = (listVideos, index, lessons, lesson) => {
        const $ = document.querySelector.bind(document);
        const isOpen = $('.videos-list.hide');
        const isActive = $('.lesson-title.active');
        const isOpenMenu = Array.from(listVideos).indexOf(isOpen);
        if (isOpenMenu == index) {
            isOpen.classList.remove('hide')
            isActive.classList.remove('active')
        } else {
            if (isOpen) {
                isOpen.classList.remove('hide');
                isActive.classList.remove('active')
            }
            lesson.classList.add('active')
            listVideos[index].classList.add('hide')
        }
    }
    async componentDidMount() {
        await this.getAllCourseFromReact()
        await this.getAllLessonFromReact()

        const $$ = document.querySelectorAll.bind(document);
        const courses = $$('.course-title')
        const courseBodys = $$('.course-body')
        const lessons = $$('.lesson-title')
        const listVideos = $$('.videos-list')
        Array.from(courses).forEach((course, index) => {
            course.addEventListener('click', this.handleCourseClick.bind(this, courseBodys, index, courses, course));
        });
        Array.from(lessons).forEach((lesson, index) => {
            lesson.addEventListener('click', this.handleLessonClick.bind(this, listVideos, index, lessons, lesson));
        });
    }
    getAllCourseFromReact = async () => {
        let response = await getAllCourses('ALL');
        if (response && response.errCode === 0) {
            this.props.setAllCourses(response.courses)
        }
    }
    getAllLessonFromReact = async () => {
        let response = await getAllLessons('ALL');
        if (response && response.errCode === 0) {
            this.props.setAllLessons(response.lessons)
        }
    }
    toggleCourseModal = () => {
        this.props.setOpenModal(!this.props.isOpenModal);
    }
    toggleLessonModal = () => {
        this.props.setOpenModalLesson(!this.props.isOpenModalLesson)
    }
    handleAddNewCourse = () => {
        this.props.setOpenModal(!this.props.isOpenModal);
    }

    handleAddNewLesson = (id) => {
        this.props.setOpenModalLesson(!this.props.isOpenModalLesson);
        this.props.setCourseId(id);
    }
    createNewCourse = async (data) => {
        try {
            let response = await createNewCourseService(data);
            if (response && response.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllCourseFromReact();
                this.props.setOpenModal(false);
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }
    createNewLesson = async (data) => {
        try {
            let response = await createNewLessonService(data);
            if (response && response.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllLessonFromReact();
                this.props.setOpenModalLesson(false);
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleEditCourse = (id) => {
        this.props.setOpenEditModal(true);
        this.props.setCourseId(id);
    }
    handleEditLesson = (id) => {
        this.props.setOpenEditModalLesson(true);
        this.props.setLessonId(id);
    }
    editCourse = async (data) => {
        try {
            let response = await editCourseService(data);
            console.log(response);
            if (response && response.errCode === 0) {
                this.props.setOpenEditModal(false);
                await this.getAllCourseFromReact();
            }
            alert(response.message);
        } catch (e) {
            console.log(e);
        }
    }
    editLesson = async (data) => {
        try {
            let response = await editLessonService(data);
            console.log(response);
            if (response && response.errCode === 0) {
                this.props.setOpenEditModalLesson(false);
                await this.getAllLessonFromReact();
            }
            alert(response.message);
        } catch (e) {
            console.log(e);
        }
    }
    toggleEditCourseModal = () => {
        this.props.setOpenEditModal(!this.props.isOpenEditModal)
    }
    toggleEditLessonModal = () => {
        this.props.setOpenEditModalLesson(!this.props.isOpenEditModalLesson)
    }
    handleDeleteCourse = async (courseId) => {
        console.log(courseId)
        try {
            let response = await deleteCourseService(courseId);
            console.log(response);
            if (response && response.errCode === 0) {
                await this.getAllCourseFromReact();
                alert(response.message);
            }
        } catch (e) {
            console.log(e);
        }
    }
    handleDeleteLesson = async (lessonId) => {
        console.log(lessonId)
        try {
            let response = await deleteLessonService(lessonId);
            console.log(response);
            if (response && response.errCode === 0) {
                await this.getAllLessonFromReact();
                alert(response.message);
            }
        } catch (e) {
            console.log(e);
        }
    }
    componentWillUnmount() {
        const courses = document.querySelectorAll('.course-title');
        Array.from(courses).forEach(course => {
            course.removeEventListener('click', this.handleCourseClick);
        });
    }

    render() {
        let allCourses = this.props.arrCourses;
        let allLessons = this.props.arrLessons;
        console.log(allCourses);
        console.log(allLessons);
        return (
            <Scrollbars style={{ height: "80vh" }}>
                <div className="be-content">
                    <ModalCourse
                        isOpen={this.props.isOpenModal}
                        toggleFromParent={this.toggleCourseModal}
                        createNewCourse={this.createNewCourse}
                    />
                    <ModalEditCourse
                        isOpen={this.props.isOpenEditModal}
                        toggleEditFromParent={this.toggleEditCourseModal}
                        editCourse={this.editCourse}
                        courseId={this.props.courseId}
                    />
                    <ModalLesson
                        isOpen={this.props.isOpenModalLesson}
                        toggleFromParentLesson={this.toggleLessonModal}
                        createNewLesson={this.createNewLesson}
                        courseId={this.props.courseId}
                    />
                    <ModalEditLesson
                        isOpen={this.props.isOpenEditModalLesson}
                        toggleEditFromParentLesson={this.toggleEditLessonModal}
                        editLesson={this.editLesson}
                        lessonId={this.props.lessonId}
                    />
                    <div className="title text-center" style={{ paddingBottom: "20px" }}>Manage courses</div>
                    <div className="card mb-3">
                        <div className='btn btn-primary px-3' onClick={this.handleAddNewCourse}><i className='fas fa-plus'></i>Add new course</div>

                        {allCourses && allCourses.map((course, index) => {
                            return (
                                <div className="course">
                                    <div className="card-body course-title">
                                        <div className="row">
                                            <div className="col-11">
                                                <h4 className="mb-0">{index + 1}. {course.title}</h4>
                                            </div>
                                            <div className='col-1'>
                                                <DropdownButton id="my-dropdown" title={<FaEllipsisH />}>
                                                    <Dropdown.Item onClick={() => this.handleEditCourse(course.id)}><FaEdit /> Edit</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => { this.handleDeleteCourse(course.id) }}><FaTrash /> Delete</Dropdown.Item>
                                                </DropdownButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="course-body">
                                        <div className="course-content">
                                            <div style={{ fontSize: "16px", fontWeight: "bold", color: "blue" }}>Thời gian tạo: {course.createdAt}</div>
                                            <div className="course-img mt-3">
                                                <img src={course.img_url} />
                                            </div>
                                            <div className="course-description mt-3">
                                                {course.description}
                                            </div>
                                        </div>
                                        <div className='btn btn-primary px-3' style={{ marginLeft: "70px" }} onClick={() => this.handleAddNewLesson(course.id)}><i className='fas fa-plus'></i>Add new lesson</div>
                                        <div className="lesson col-md-10 offset-1 mt-3">
                                            {allLessons.map((lesson, index) => {
                                                return lesson.courseID === course.id && (
                                                    <div className="card-body lesson-title">
                                                        <div className="row">
                                                            <div className="col-sm-11">
                                                                <h5 className="mb-0">{index + 1}. {lesson.title}</h5>
                                                            </div>
                                                            <div className="col-sm-1">
                                                                <DropdownButton id="my-dropdown" title={<FaEllipsisH />}>
                                                                    <Dropdown.Item onClick={() => this.handleEditLesson(lesson.id)}><FaEdit /> Edit</Dropdown.Item>
                                                                    <Dropdown.Item onClick={() => { this.handleDeleteLesson(lesson.id) }}><FaTrash /> Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </div>
                                                        </div>
                                                        <div className="videos-list">
                                                            <div className="video-title active text-secondary"><a href="#">Video 1</a></div>
                                                            <div className="video-title text-secondary"><a href="#">Video 2</a></div>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                        </div>

                                    </div>
                                </div>
                            )
                        })
                        }

                    </div>
                </div>
            </Scrollbars>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        arrCourses: state.course.arrCourses,
        arrLessons: state.course.arrLessons,
        isOpenModal: state.course.isOpenModal,
        isOpenEditModal: state.course.isOpenEditModal,
        isOpenModalLesson: state.course.isOpenModalLesson,
        isOpenEditModalLesson: state.course.isOpenEditModalLesson,
        courseId: state.course.courseId,
        lessonId: state.course.lessonId
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setAllCourses: (courses) => dispatch(setAllCourses(courses)),
        setAllLessons: (lessons) => dispatch(setAllLessons(lessons)),
        setOpenModal: (isOpen) => dispatch(setOpenModal(isOpen)),
        setOpenEditModal: (isOpen) => dispatch(setOpenEditModal(isOpen)),
        setOpenModalLesson: (isOpen) => dispatch(setOpenModalLesson(isOpen)),
        setOpenEditModalLesson: (isOpen) => dispatch(setOpenEditModalLesson(isOpen)),
        setCourseId: (id) => dispatch(setCourseId(id)),
        setLessonId: (id) => dispatch(setLessonId(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseManage);
