import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModelHeader, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            fullName: '',
            phoneNumber: '',
            address: '',
            gender: ''
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset state
            this.setState({
                email: '',
                password: '',
                fullName: '',
                phoneNumber: '',
                address: '',
                gender: ''
            })
        })
    }

    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;

        this.setState({
            ...copyState
        })
    }
    checkValiInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'fullName', 'address', 'phoneNumber', 'gender']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleAddNewUser = () => {
        let isValid = this.checkValiInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }

    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }}>
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' onChange={(e) => { this.handleOnChangeInput(e, "email") }}
                                value={this.state.email} />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' onChange={(e) => { this.handleOnChangeInput(e, "password") }}
                                value={this.state.password} />
                        </div>
                        <div className='input-container'>
                            <label>Full name</label>
                            <input type='text' onChange={(e) => { this.handleOnChangeInput(e, "fullName") }}
                                value={this.state.fullName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Phone number</label>
                            <input type='text' onChange={(e) => { this.handleOnChangeInput(e, "phoneNumber") }}
                                value={this.state.phoneNumber}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' onChange={(e) => { this.handleOnChangeInput(e, "address") }}
                                value={this.state.address} />
                        </div>
                        <div class="form-group">
                            <label for="inputGender">Gender</label>
                            <select id="inputGender" class="form-control" name="gender" onChange={(e) => { this.handleOnChangeInput(e, "gender") }}
                                value={this.state.gender}>
                                <option selected>Choose...</option>
                                <option value="1">Nam</option>
                                <option value="0">Nữ</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary'
                        onClick={() => { this.handleAddNewUser() }} className='px-3'>Add new</Button>{' '}
                    <Button color='secondary' onClick={() => { this.toggle() }} className='px-3'>Close</Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
