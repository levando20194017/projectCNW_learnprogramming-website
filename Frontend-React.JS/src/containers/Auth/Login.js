import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { push } from "connected-react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        // các props khác
    };
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
    handleForgotPassword = () => {
        this.props.history.push('/forgotpassword');
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
            <div className="login-page-container">
                <div className="main-login">
                    <div className="brand d-flex">
                        <img src={`${process.env.PUBLIC_URL}/assets/img/logo-symbol.png`} alt="Avatar" style={{ height: "50px" }} />
                        <h4 style={{ color: "blue", marginLeft: "10px" }}>C</h4><h4 style={{ color: "red" }}>-</h4>
                        <h4 style={{ color: "green" }}>C</h4><h4 style={{ color: "orange" }}>r</h4><h4 style={{ color: "blue" }}>u</h4><h4 style={{ color: "red" }}>s</h4><h4 style={{ color: "blue" }}>h</h4></div>
                    <h2 className="mt-4">Đăng nhập</h2>
                    <div className="main__form mt-4">
                        <div className="main__form__children d-flex">
                            <form action="" method="POST" className="form" id="form-1"
                                onSubmit={this.handleSubmit}>
                                <div className="inputEmail">
                                    <input id="email" type="email" name="email" placeholder="Email" className="form-control"
                                        value={this.state.email}
                                        onChange={(event) => {
                                            this.handleOnChangeEmail(event);
                                        }}
                                    />

                                </div>
                                <div className="usePresentEmail">
                                    <a href="#">Sử dụng địa chỉ email hiện tại của tôi</a>
                                </div>
                                <div className="inputPassword mt-3">
                                    <input id="password" type={this.state.isShowPassword ? "text" : "password"} name="password" placeholder="Mật khẩu" className="form-control"
                                        value={this.state.password}
                                        onChange={(event) => {
                                            this.handleOnChangePassword(event);
                                        }}

                                    />
                                </div>
                                {/* {this.state.errMessage === 'Ok' ? (<div className="text-success">{this.state.errMessage}</div>) : (<div className="text-danger mt-2" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>{this.state.errMessage}</div>)} */}
                                <div className="showPassword d-flex mt-3">
                                    <div>
                                        <input type="checkbox" id="isShowPassword" name="isShowPassword" checked={this.state.isShowPassword} onChange={this.handleShowHidePassword} />
                                    </div>
                                    <div className="textShow"> Hiện mật khẩu</div>
                                </div>
                                <div className="button-list mt-4">
                                    <div>
                                        <button className="btn-forgot" onClick={this.handleForgotPassword}>Forgot password</button>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn-next" onClick={() => { this.handleLogin() }}>Đăng nhập</button>
                                    </div>
                                </div>
                            </form>
                        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
