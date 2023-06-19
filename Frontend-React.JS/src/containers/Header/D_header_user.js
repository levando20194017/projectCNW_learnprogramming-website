import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import { adminMenu } from './menuApp';

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
                            CODECRUSH
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
                    <div id='headerUser-right-container'>
                        <img id='headerUser-right-avt' src={userInfo?.img_url} alt='avatar' style={{height: "40px", borderRadius: "50%"}} />
                        <div className="btn btn-logout" onClick={processLogout}>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </div>
                </div>
            </div>
            // <div className="header-container">
            //     {/* thanh navigator */}
            //     <div className="header-tabs-container">
            //         <Navigator menus={adminMenu} />
            //     </div>
            //     {/* <div>Xin chao</div> */}

            //     {/* nút logout */}
            //     {userInfo && userInfo.fullName ? <div>Xin chào {userInfo.fullName}</div> : ""}
            //     <div className="btn btn-logout" onClick={processLogout}>
            //         <i className="fas fa-sign-out-alt"></i>
            //     </div>
            // </div>
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
