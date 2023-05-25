import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import '../../assets/css/app.css'


class Sidebar extends Component {

    render() {
        const { processLogout, userInfo } = this.props;
        return (
            <div class="be-wrapper be-fixed-sidebar">
                <div className="be-left-sidebar">
                    <div className="left-sidebar-wrapper">
                        <a className="left-sidebar-toggle" href="#">Dashboard</a>
                        <div className="left-sidebar-spacer">
                            <div className="left-sidebar-scroll">
                                <div className="left-sidebar-content">
                                    <ul className="sidebar-elements">
                                        <li className="divider">Menu</li>
                                        <li className="active">
                                            <a href="index.html">
                                                <i className="icon mdi mdi-home"></i>
                                                <span>Dashboard</span>
                                            </a>
                                        </li>
                                        <li className="parent">
                                            <a href="#">
                                                <i className="icon mdi mdi-face"></i>
                                                <span>Users</span>
                                            </a>
                                            <ul className="sub-menu">
                                                <li><a href="#">Manage users</a></li>
                                                <li><a href="#">User progress</a></li>
                                                <li><a href="#">Notifications</a></li>
                                            </ul>
                                        </li>
                                        <li className="parent">
                                            <a href="#">
                                                <i className="icon mdi mdi-chart-donut"></i>
                                                <span>Courses</span>
                                            </a>
                                            <ul className="sub-menu">
                                                <li><a href="#">Manage courses</a></li>
                                                <li><a href="#">Manage lessons</a></li>
                                                <li><a href="#">Manage videos</a></li>
                                            </ul>
                                        </li>
                                        <li className="parent">
                                            <a href="#">
                                                <i className="icon mdi mdi-dot-circle"></i>
                                                <span>Posts</span>
                                            </a>
                                            <ul className="sub-menu">
                                                <li><a href="#">Manage posts</a></li>
                                                <li><a href="#">Manage comments</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
