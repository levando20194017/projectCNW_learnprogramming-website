import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService } from '../../services/userService';
import ModalUser from './ModalUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false
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
            }
        } catch (e) {
            console.log(e)
        }
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
                                                <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                                <button className="btn-delete"><i className="fas fa-trash"></i></button>
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
