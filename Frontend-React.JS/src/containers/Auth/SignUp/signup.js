import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './signup.scss'
import { handleSignUpApi } from '../../../services/userService';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Spinner from "react-bootstrap/Spinner";
class SignUp extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        // các props khác
    };
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            isShowPassword: false,
            isLoading: false,
            errors: {
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
            }
        }
    }

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        copyState.errors[id] = ""
        this.setState({
            ...copyState
        })
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleOnSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt khi submit form
        const isValid = this.validateForm();
        if (isValid && this.state.password === this.state.confirmPassword) {

            this.setState({
                message: '',
                isLoading: true
            })
            try {
                const response = await handleSignUpApi(this.state.email, this.state.password, this.state.fullName);
                if (response && response.errCode === 0) {
                    this.setState({
                        message: response.message
                    })
                    toast.success(<div style={{ width: "300px", fontSize: "14px" }}><i className="fas fa-check-circle"></i> Successful account registration!</div>, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    this.props.history.push('/login');
                }
                if (response && response.errCode !== 0) {
                    this.setState({
                        message: response.message
                    })
                    toast.error(<div style={{ width: "300px", fontSize: "14px" }}><FontAwesomeIcon icon={faExclamationTriangle} /> Account registration failed!</div>, {
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
                this.setState({
                    isLoading: false
                })
            } catch (error) {
                console.log(error);

            }
        }
    }
    handleClickBtnLogin = () => {
        this.props.history.push('/login');
    }
    validateForm = () => {
        let isValid = true;
        const errors = {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
        if (this.state.fullName.trim() === '') {
            isValid = false;
            errors.fullName = 'Tên đầy đủ không được để trống';
        }
        if (this.state.email.trim() === '') {
            isValid = false;
            errors.email = 'Email không được để trống';
        } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
            isValid = false;
            errors.email = 'Email không hợp lệ';
        }
        if (this.state.password.trim() === '') {
            isValid = false;
            errors.password = 'Mật khẩu không được để trống';
        } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(this.state.password)) {
            isValid = false;
            errors.password = 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, chữ cái in hoa, số và biểu tượng';
        }
        if (this.state.confirmPassword.trim() === '') {
            isValid = false;
            errors.confirmPassword = 'Xác nhận mật khẩu không được để trống';
        }
        this.setState({
            errors: errors
        });
        return isValid;
    }

    render() {
        return (
            <div className="signup-page-container">
                <div className="main">
                    <div className="brand d-flex">
                        <img src={`${process.env.PUBLIC_URL}/assets/img/logo-symbol.png`} alt="Avatar" style={{ height: "50px" }} />
                        <h4 style={{ color: "blue", marginLeft: "10px" }}>C</h4><h4 style={{ color: "red" }}>-</h4>
                        <h4 style={{ color: "green" }}>C</h4><h4 style={{ color: "orange" }}>r</h4><h4 style={{ color: "blue" }}>u</h4><h4 style={{ color: "red" }}>s</h4><h4 style={{ color: "blue" }}>h</h4></div>
                    <h2 className="mt-2">Tạo Tài khoản</h2>
                    <br />
                    <div className="main__form">
                        <div className="main__form__children d-flex">
                            <form action="" method="POST" className="form col-6" id="form-1"
                                onSubmit={this.handleOnSubmit}>
                                <div className="inputBox">
                                    <input id="fullName" type="text" name="fullName" placeholder="Tên đầy đủ" className="form-control"
                                        value={this.state.fullName}
                                        onChange={e => this.handleOnChangeInput(e, "fullName")}
                                    />
                                    {this.state.errors.fullName && <div className="text-danger" style={{ fontSize: "14px", padding: "6px" }}>{this.state.errors.fullName}</div>}
                                </div>
                                <div className="inputEmail">
                                    <input id="email" type="email" name="email" placeholder="Email" className="form-control"
                                        value={this.state.email}
                                        onChange={e => { this.handleOnChangeInput(e, "email") }}
                                    />
                                    {this.state.errors.email ? <p className="text-danger" style={{ fontSize: "14px" }}>{this.state.errors.email}</p> : <p>Bạn có thể sử dụng chữ cái, số và dấu chấm</p>}


                                </div>
                                <div className="usePresentEmail">
                                    <a href="#">Sử dụng địa chỉ email hiện tại của tôi</a>
                                </div>
                                <div className="inputPassword d-flex">
                                    <div>
                                        <input id="password" type={this.state.isShowPassword ? "text" : "password"} name="password" placeholder="Mật khẩu" className="form-control"
                                            value={this.state.password}
                                            onChange={e => { this.handleOnChangeInput(e, "password") }}
                                        />

                                    </div>
                                    <div>
                                        <input id="confirmPassword" type={this.state.isShowPassword ? "text" : "password"} name="confirmPassword" placeholder="Xác nhận" className="form-control"
                                            value={this.state.confirmPassword}
                                            onChange={e => { this.handleOnChangeInput(e, "confirmPassword") }}
                                        />
                                        {this.state.password !== this.state.confirmPassword && <div className="text-danger" style={{ fontSize: "14px" }}>Mật khẩu không khớp</div>}
                                    </div>
                                </div>
                                {this.state.errors.password ? <p className="text-danger" style={{ fontSize: "14px" }}>{this.state.errors.password}</p> : <p>Sử dụng 8 ký tự trở lên và kết hợp chữ cái, chữ số và biểu tượng</p>}
                                <div className="showPassword d-flex" onClick={this.handleShowHidePassword}>
                                    <div>
                                        <input type="checkbox" id="isShowPassword" name="isShowPassword" checked={this.state.isShowPassword} />
                                    </div>
                                    <div className="textShow"> Hiện mật khẩu</div>
                                </div>
                                <div className="button-list">
                                    <div>
                                        <button className="btn-signUP" onClick={this.handleClickBtnLogin}>Đăng nhập</button>
                                    </div>
                                    <div>
                                        {this.state.isLoading ? <div className="text-center">
                                            <Spinner animation="border" variant="primary" />
                                        </div> :
                                            <button type="submit" className="btn-next">Tiếp theo</button>
                                        }
                                    </div>
                                </div>
                                {this.state.message === 'Ok' ? <div className="text-success">{this.state.message}</div> : <div className="text-danger mt-3" style={{ fontSize: "14px" }}>{this.state.message}</div>}
                            </form>
                            <div className="google-image col-5 offset-1">
                                <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="" width="244" height="244" />
                                <figcaption>CodeCrush. Không gian học lập trình, trao đổi học tập, kết nối tới mọi người.</figcaption>
                            </div>
                        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));