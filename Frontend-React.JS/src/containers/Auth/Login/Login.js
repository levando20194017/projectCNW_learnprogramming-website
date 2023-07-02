import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { push } from "connected-react-router";
import * as actions from "../../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../../services/userService';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";
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
            isLoading: false
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
            errMessage: '',
            isLoading: true
        })
        try {
            let data = await handleLoginApi(this.state.email, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
                toast.error(<div style={{ width: "300px", fontSize: "14px" }}><FontAwesomeIcon icon={faExclamationTriangle} /> Login failed!</div>, {
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
            if (data && data.errCode === 0) {
                toast.success(<div style={{ width: "300px", fontSize: "14px" }}><i className="fas fa-check-circle"></i> Login success!</div>, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                if (data.user.role == true) {
                    this.props.adminLoginSuccess(data.user)
                    // this.props.history.push('/system/user-manage')
                } else {
                    this.props.userLoginSuccess(data.user)
                    this.props.history.push('/home');
                    window.location.reload();
                }
                console.log('login success')
            }
            this.setState({
                isLoading: false
            })
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
                                {this.state.errMessage === 'Ok' ? (<div className="text-success">{this.state.errMessage}</div>) : (<div className="text-danger mt-2" style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>{this.state.errMessage}</div>)}
                                <div className="showPassword d-flex mt-3">
                                    <div>
                                        <input type="checkbox" id="isShowPassword" name="isShowPassword" checked={this.state.isShowPassword} onChange={this.handleShowHidePassword} />
                                    </div>
                                    <div className="textShow"> Hiện mật khẩu</div>
                                </div>
                                <div className="col-4 offset-8">
                                    <Link to="/forgotpassword">
                                        <a className="btn-forgot" style={{ cursor: "pointer" }}>Forgot password</a>
                                    </Link>
                                </div>
                                <div>
                                    <div className="button-list mt-4" style={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                                        {/* <div>
                                            <button className="btn-forgot" onClick={this.handleForgotPassword}>Forgot password</button>
                                        </div> */}
                                        <div>
                                            {this.state.isLoading ? <div className="text-center">
                                                <Spinner animation="border" variant="primary" />
                                            </div> : <button type="submit" className="btn-next" onClick={this.handleLogin}>Đăng nhập</button>}

                                        </div>
                                    </div>
                                    <div className="mt-3" style={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
                                        <p>Không có tài khoản? <Link to="/signup"><a style={{ cursor: "pointer" }}>Đăng ký</a></Link></p>
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
