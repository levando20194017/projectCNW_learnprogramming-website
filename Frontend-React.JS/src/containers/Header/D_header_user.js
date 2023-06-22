import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import { adminMenu } from './menuApp';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography } from '@mui/material';

import './D_header_user.scss';

class userHeader extends Component {

    render() {
        const { processLogout, userInfo } = this.props;
        return (
            <div className="headerUser">
                <div id="headerUser-left">
                    <div id="headerUser-left-logo">
                        <img src={`${process.env.PUBLIC_URL}/assets/img/logo-symbol.png`} alt='avatar' style={{height: "40px", borderRadius: "50%"}} />                        
                        <div id='headerUser-left-logo-p'>
                            CodeCrush
                        </div>
                    </div>
                </div>

                <div id="headerUser-center">
                    <ul id="headerUser-nav">
                        <li ><a href="">HOME</a></li>
                        <li ><a href="">BLOG</a></li>
                        <li><a href="">ABOUT US</a></li>
                    </ul>
                </div>

                <div id='headerUser-right'>                   
                    <ul id='headerUser-right-nav'>
                            <li>
                                <a href="#">
                                    Khóa học của tôi
                                </a>
                                <ul id="subnav-courses">
                                    <li><a href="">HTML CSS cơ bản</a></li>
                                    <li><a href="">ReactJS cơ bản</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">
                                    <img className="headerUser-right-avt" src={userInfo?.img_url} alt='avatar' width={40} height={40} />
                                </a>
                                <ul id="subnav-avatar">
                                    <li><a href="">Trang cá nhân</a></li>
                                    <li><a href="">Đổi mật khẩu</a></li>
                                    <li><a href="" onClick={processLogout}><Link to='/'>Đăng xuất</Link></a></li>
                                </ul>
                            </li> 
                            {/* <Link to='/'>
                                <div className="btn btn-logout" onClick={processLogout}>
                                    <i className="fas fa-sign-out-alt"></i>
                                </div>
                            </Link> */}
                    </ul>
                </div>
            </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(userHeader);
