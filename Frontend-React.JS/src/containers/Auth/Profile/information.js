import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './style.scss'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from "../../../store/actions";
import { editUserProfileService } from '../../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getAllUsers } from '../../../services/userService';
class Information extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        // các props khác
    };

    userData = JSON.parse(localStorage.getItem("persist:user"));
    userInfo = JSON.parse(this.userData.userInfo);
    constructor(props) {
        super(props);
        this.state = {
            isConfirmModalOpen: false,
            isEditing: false,
            message: '',
            updatedUserData: '',
            userInfomation: ''
        }
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    userID = this.props.userID
    componentDidMount = async () => {
        try {
            const response = await getAllUsers(this.userID)
            if (response && response.errCode === 0) {
                this.setState({
                    userInfomation: response.users,
                    updatedUserData: response.users
                })
            }
        } catch (error) {
            console.log();
        }
    }
    openConfirmModal = (commentId) => {
        this.setState({
            isConfirmModalOpen: true,
        });
    }
    // Hàm đóng modal xác nhận xóa comment
    closeConfirmModal = () => {
        this.setState({
            isConfirmModalOpen: false,
        });
    }
    handleEditClick = () => {
        this.setState({
            isEditing: true
        })
    };
    // handleChangePassword = () => {
    //     this.props.history.push('./changepassword')
    // }
    handleChangeAvatar = async () => {
        const response = await editUserProfileService(this.state.updatedUserData);
        if (response && response.errCode === 0) {
            toast.success(<div style={{ width: "300px", fontSize: "14px" }}><i className="fas fa-check-circle"></i> Change avatar successful!</div>, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            this.props.updateUser(this.state.updatedUserData)
            const responseOfUser = await getAllUsers(this.userID)
            this.setState({
                isConfirmModalOpen: false,
                userInfomation: responseOfUser.users
            })
        }
        if (response && response.errCode !== 0) {
            toast.error(<div style={{ width: "300px", fontSize: "14px" }}><FontAwesomeIcon icon={faExclamationTriangle} /> Change avatar failed!</div>, {
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
    handleSaveClick = async () => {
        const result = await editUserProfileService(this.state.updatedUserData);
        this.setState({
            message: result.message
        })
        if (result && result.errCode === 0) {
            toast.success(<div style={{ width: "300px", fontSize: "14px" }}><i className="fas fa-check-circle"></i> User update successful!</div>, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            this.props.updateUser(this.state.updatedUserData)
            const responseOfUser = await getAllUsers(this.userID)
            this.setState({
                isEditing: false,
                userInfomation: responseOfUser.users
            })
        }
        if (result && result.errCode !== 0) {
            toast.error(<div style={{ width: "300px", fontSize: "14px" }}><FontAwesomeIcon icon={faExclamationTriangle} /> User update failed!</div>, {
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
    };
    handleCancelClick() {
        this.setState({
            updatedUserData: this.props.userInfo,
            isEditing: false
        });
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            updatedUserData: {
                ...prevState.updatedUserData,
                [name]: value
            }
        }));
    }

    handleSelectChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            updatedUserData: {
                ...prevState.updatedUserData,
                [name]: value === "true"
            }
        }));
    }
    render() {
        const userInfo = this.props.userInfo;
        const { userInfomation } = this.state
        return (
            <div className="main-profile">
                <div className="profile-main-body">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                {userInfomation && (
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <div className='d-flex avatar-profile' style={{ position: "relative" }}>
                                                <img src={userInfomation.img_url} alt="Avatar" className="rounded-circle"
                                                    width="150" height={150} />
                                                {userInfomation.id === userInfo.id ?
                                                    <i onClick={() => this.openConfirmModal()} className="bi bi-camera-fill"></i>
                                                    : ""
                                                }
                                            </div>
                                            <Modal isOpen={this.state.isConfirmModalOpen} toggle={this.closeConfirmModal}>
                                                <ModalHeader toggle={this.closeConfirmModal}>Change image profile</ModalHeader>
                                                <ModalBody>
                                                    <input className='form-control' name='img_url' value={this.state.updatedUserData?.img_url}
                                                        onChange={this.handleInputChange} placeholder='Enter your image link...' />
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color='primary' onClick={this.handleChangeAvatar}>Save</Button>
                                                    <Button color='secondary' onClick={this.closeConfirmModal}>Cancel</Button>
                                                </ModalFooter>
                                            </Modal>
                                            <div className='mt-3'>
                                                <h4>{userInfomation.fullName}</h4>
                                                <p className="text-secondary mb-1 mt-4">Full Stack Developer</p>
                                                <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                                                {userInfomation.id === userInfo.id ? <div style={{ height: "38px" }}>
                                                </div> : <div>
                                                    <button className="btn btn-primary">Follow</button>
                                                    <button className="btn btn-outline-primary" style={{ marginLeft: "10px" }}>Message</button>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="card mt-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            className="feather feather-globe mr-2 icon-inline">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="2" y1="12" x2="22" y2="12"></line>
                                            <path
                                                d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
                                            </path>
                                        </svg> Website</h6>
                                        <span className="text-secondary">https://bootdey.com</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            className="feather feather-github mr-2 icon-inline">
                                            <path
                                                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                            </path>
                                        </svg> Github</h6>
                                        <span className="text-secondary">bootdey</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            className="feather feather-twitter mr-2 icon-inline text-info">
                                            <path
                                                d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                                            </path>
                                        </svg> Twitter</h6>
                                        <span className="text-secondary">@bootdey</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            className="feather feather-instagram mr-2 icon-inline text-danger">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg> Instagram</h6>
                                        <span className="text-secondary">bootdey</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            className="feather feather-facebook mr-2 icon-inline text-primary">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                        </svg> Facebook</h6>
                                        <span className="text-secondary">bootdey</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {userInfomation && (<div className="col-md-8">
                            <div className="card mb-3 infor">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Full Name</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.isEditing ? (
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={this.state.updatedUserData?.fullName}
                                                    onChange={this.handleInputChange}
                                                />
                                            ) : (
                                                userInfomation.fullName
                                            )}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {userInfomation.email}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Phone</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.isEditing ? (
                                                <input
                                                    type="text"
                                                    name="phoneNumber"
                                                    value={this.state.updatedUserData?.phoneNumber}
                                                    onChange={this.handleInputChange}
                                                />
                                            ) : (
                                                userInfomation.phoneNumber
                                            )}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Address</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.isEditing ? (
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={this.state.updatedUserData?.address}
                                                    onChange={this.handleInputChange}
                                                />
                                            ) : (
                                                userInfomation.address
                                            )}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Gender</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {this.state.isEditing ? (
                                                <select
                                                    name="gender"
                                                    value={this.state.updatedUserData?.gender}
                                                    onChange={this.handleSelectChange}
                                                >
                                                    <option value={false.toString()}>Nữ</option>
                                                    <option value={true.toString()}>Nam</option>
                                                </select>
                                            ) : (
                                                userInfomation.gender ? "Nam" : "Nữ"
                                            )}
                                        </div>
                                    </div>
                                    <hr />
                                    {userInfomation.id === userInfo.id ?
                                        <div className="row">
                                            <div className="col-2">
                                                {this.state.isEditing ? (
                                                    <div className="d-flex">
                                                        <button className="btn btn-success" onClick={this.handleSaveClick}>
                                                            Save
                                                        </button>
                                                        <button className="btn btn-danger" onClick={this.handleCancelClick}>
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button className="btn btn-info" onClick={this.handleEditClick}>
                                                        Edit
                                                    </button>
                                                )}
                                            </div>
                                            <div className="col-3">
                                                <Link to="/changepassword">
                                                    <button className="btn btn-info">
                                                        Change password
                                                    </button>
                                                </Link>
                                            </div>
                                        </div> :
                                        <div style={{ height: '38px' }}> </div>
                                    }
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 style={{ textAlign: "center", fontWeight: "bold" }}>More details</h5>
                                    <div className="education">
                                        <div>
                                            <div style={{ fontWeight: "600", fontSize: "17px", marginBottom: "5px", color: "blue" }}>
                                                <i className="fas fa-school"></i> Education
                                            </div>
                                            <div style={{ marginLeft: "10px" }}>
                                                Student at Ha Noi university of science and technology
                                            </div>
                                            <div style={{ marginLeft: "10px" }}>
                                                Major: Computer science - IT1
                                            </div>
                                        </div>
                                    </div>
                                    <div className="favourite">
                                        <div style={{ fontWeight: "600", fontSize: "17px", marginBottom: "5px", color: "green" }} className="mt-2">
                                            <i className="fas fa-star"></i>
                                            Favourite
                                        </div>
                                        <div className="d-flex" style={{ justifyContent: "space-between", fontWeight: "500", padding: "0 10px" }}>
                                            <div>
                                                <i className="fas fa-futbol"></i> Play Soccer
                                            </div>
                                            <div>
                                                <i class="fas fa-guitar"></i> Play guitar
                                            </div>
                                            <div>
                                                <i className="fas fa-tv"></i> Watch movie
                                            </div>
                                            <div>
                                                <i className="fas fa-basketball-ball"></i> Play basketball
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (userInfor) => dispatch(actions.updateUser(userInfor)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Information));
