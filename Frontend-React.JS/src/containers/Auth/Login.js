import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPassword: false,
        }
    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        }
        )
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        }
        )
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handleLogin = async () => {
        // event.preventDefault()
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.email, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                if (data.user.role == true) {
                    this.props.adminLoginSuccess(data.user)
                } else {
                    this.props.userLoginSuccess(data.user)
                }
                console.log('login success')
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }
    }
    handleSubmit(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt khi submit form
        // Gửi yêu cầu đăng nhập tới máy chủ và xử lý phản hồi ở đây
    }
    render() {

        return (

            <div className="container-fluid bg-form">
                <div className="row justify-content-center">
                    <div className="col-md-4 col-sm-8 col-xs-10 login-container">
                        <form onSubmit={this.handleSubmit}>
                            <h1 className="login-title mb-4">Sign in</h1>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control mb-4"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={this.state.email}
                                    onChange={(event) => {
                                        this.handleOnChangeEmail(event);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="custom-input-password">
                                    <input
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        className="form-control mb-4"
                                        id="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={(event) => {
                                            this.handleOnChangePassword(event);
                                        }}
                                    />
                                    <span onClick={() => { this.handleShowHidePassword(); }}>
                                        <i
                                            className={
                                                this.state.isShowPassword
                                                    ? 'fas fa-eye'
                                                    : 'fas fa-eye-slash'
                                            }
                                        ></i>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12" style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className="text-center">
                                <p className="forgot-password">
                                    <a href="#">Forgot password?</a>
                                </p>
                                <div className="clearfix"></div>
                                <button
                                    type="submit"
                                    className="btn btn-success my-3 signin"
                                    onClick={() => {
                                        this.handleLogin();
                                    }}
                                >
                                    Sign in
                                </button>
                                <p>
                                    Don't have an account? <a href="signup.html">Sign up</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
        adminLoginSuccess: (adminInfor) => dispatch(actions.adminLoginSuccess(adminInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
