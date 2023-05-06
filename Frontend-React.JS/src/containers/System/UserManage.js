import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditModal: false,
            userId: 0,
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact()
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }
    handleEditUser = (id) => {
        this.setState({
            isOpenEditModal: true,
            userId: id
        })
    }
    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState(
                {
                    arrUsers: response.users
                }
            )
        }
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModal: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleDeleteUser = async (userId) => {
        console.log(userId)
        try {
            let response = await deleteUserService(userId);
            console.log(response);
            if (response && response.errCode === 0) {
                await this.getAllUserFromReact();
                alert(response.message);
            }
        } catch (e) {
            console.log(e);
        }
    }
    editUser = async (data) => {
        try {
            let response = await editUserService(data);
            console.log(response);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenEditModal: false
                })
                await this.getAllUserFromReact();
            }
            alert(response.message);
        } catch (e) {
            console.log(e);
        }
    }
    toggleEditUserModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal
        })
    }


    render() {
        let allUser = this.state.arrUsers;
        return (
            <div className="user-container">
                <div className="title text-center">Manage users</div>
                <div className='btn btn-primary px-3' onClick={this.handleAddNewUser}><i className='fas fa-plus'></i>Add new user</div>
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <ModalEditUser
                    isOpen={this.state.isOpenEditModal}
                    toggleEditFromParent={this.toggleEditUserModal}
                    editUser={this.editUser}
                    userId={this.state.userId}
                />
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Full name</th>
                                <th>Adress</th>
                                <th>Gender</th>
                                <th>Phone number</th>
                                <th>Actions</th>
                            </tr>

                            {
                                allUser && allUser.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.fullName}</td>
                                            <td>{item.address}</td>
                                            <td>{`${item.gender ? "Nam" : "Nữ"}`}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>
                                                <button className="btn-edit"><i className="fas fa-pencil-alt"
                                                    onClick={() => this.handleEditUser(item.id)}></i></button>
                                                <button className="btn-delete"><i className="fas fa-trash"
                                                    onClick={() => { this.handleDeleteUser(item.id) }}></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>


                    </table>

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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
