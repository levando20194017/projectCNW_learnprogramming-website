import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './CourseManage.scss'
import { getAllCourses, createNewCourseService, editCourseService, deleteCourseService } from '../../../services/courseService';
import { emitter } from '../../../utils/emitter';
import ModalCourse from './ModalCourse';
import ModalEditCourse from './ModalEditCourse';
class CourseManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrCourses: [],
            isOpenModal: false,
            isOpenEditModal: false,
            courseId: 0,
        }
    }

    async componentDidMount() {
        await this.getAllCourseFromReact()
    }
    getAllCourseFromReact = async () => {
        let response = await getAllCourses('ALL');
        if (response && response.errCode === 0) {
            this.setState(
                {
                    arrCourses: response.courses
                }
            )
        }
    }
    toggleCourseModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    handleAddNewCourse = () => {
        this.setState({
            isOpenModal: true
        })
    }
    createNewCourse = async (data) => {
        try {
            let response = await createNewCourseService(data);
            if (response && response.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllCourseFromReact();
                this.setState({
                    isOpenModal: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleEditCourse = (id) => {
        this.setState({
            isOpenEditModal: true,
            courseId: id
        })
    }
    editCourse = async (data) => {
        try {
            let response = await editCourseService(data);
            console.log(response);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenEditModal: false
                })
                await this.getAllCourseFromReact();
            }
            alert(response.message);
        } catch (e) {
            console.log(e);
        }
    }
    toggleEditCourseModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal
        })
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

    render() {
        let allCourses = this.state.arrCourses;
        return (
            <div className="be-content">
                <div className="main-content container-fluid">
                    <div className="user-container">
                        <div className="title text-center">Manage courses</div>
                        <div className='btn btn-primary px-3' onClick={this.handleAddNewCourse}><i className='fas fa-plus'></i>Add new course</div>
                        <ModalCourse
                            isOpen={this.state.isOpenModal}
                            toggleFromParent={this.toggleCourseModal}
                            createNewCourse={this.createNewCourse}
                        />
                        <ModalEditCourse
                            isOpen={this.state.isOpenEditModal}
                            toggleEditFromParent={this.toggleEditCourseModal}
                            editCourse={this.editCourse}
                            courseId={this.state.courseId}
                        />
                        <div className="users-table mt-3 mx-1">
                            <table id="customers">
                                <tbody>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Time</th>
                                        <th>Actions</th>
                                    </tr>

                                    {
                                        allCourses && allCourses.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{item.title}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.img_url}</td>
                                                    <td>{item.createdAt}</td>
                                                    <td>
                                                        <button className="btn-edit"><i className="fas fa-pencil-alt"
                                                            onClick={() => this.handleEditCourse(item.id)}></i></button>
                                                        <button className="btn-delete"><i className="fas fa-trash"
                                                            onClick={() => { this.handleDeleteCourse(item.id) }}></i></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>


                            </table>

                        </div>
                    </div>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseManage);
