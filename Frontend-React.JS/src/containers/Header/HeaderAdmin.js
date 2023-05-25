import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
// import './HeaderAdmin.scss';
import '../../assets/css/app.css'
class HeaderAdmin extends Component {

    render() {
        const { processLogout, adminInfo } = this.props;
        return (
            <div class="be-wrapper be-fixed-sidebar">
                <nav className="navbar navbar-expand fixed-top be-top-header">
                    <div className="container-fluid">
                        <div className="be-navbar-header">
                            <h2 className="navbar-brand"></h2>
                            <h3 style={{ marginLeft: "-70px", marginTop: "15px" }}>CodeCrush</h3>
                        </div>
                        <div className="page-title"><span>Dashboard</span></div>
                        <div className="be-right-navbar">
                            <ul className="nav navbar-nav float-right be-user-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-expanded="false">
                                        <img src={`${process.env.PUBLIC_URL}/assets/img/avatar.png`} alt="Avatar" />
                                        <span className="user-name">Admin</span>
                                    </a>
                                    <div className="dropdown-menu" role="menu">
                                        <div className="user-info">
                                            <div className="user-name">Admin</div>
                                            <div className="user-position online">Available</div>
                                        </div>
                                        <a className="dropdown-item" href="#"><span className="icon mdi mdi-face"></span>Account</a>
                                        <a className="dropdown-item" href="#"><span className="icon mdi mdi-settings"></span>Settings</a>
                                        <a className="dropdown-item" href="" onClick={processLogout}><span className="icon mdi mdi-power"></span>Logout</a>
                                    </div>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav float-right be-icons-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link be-toggle-right-sidebar" href="#" role="button" aria-expanded="false">
                                        <span className="icon mdi mdi-settings"></span>
                                    </a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-expanded="false">
                                        <span className="icon mdi mdi-notifications"></span>
                                        <span className="indicator"></span>
                                    </a>
                                    <ul className="dropdown-menu be-notifications">
                                        <li>
                                            <div className="title">Notifications<span className="badge badge-pill">3</span></div>
                                            <div className="list">
                                                <div className="be-scroller-notifications">
                                                    <div className="content">
                                                        <ul>
                                                            <li className="notification notification-unread">
                                                                <a href="#">
                                                                    <div className="image"><img src={`${process.env.PUBLIC_URL}/assets/img/avatar2.png`} alt="Avatar" /></div>
                                                                    <div className="notification-info">
                                                                        <div className="text">
                                                                            <span className="user-name">Jessica Caruso</span> accepted your invitation to join theteam.
                                                                        </div>
                                                                        <span className="date">2 min ago</span>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li className="notification">
                                                                <a href="#">
                                                                    <div className="image"><img src={`${process.env.PUBLIC_URL}/assets/img/avatar3.png`} alt="Avatar" /></div>
                                                                    <div className="notification-info">
                                                                        <div className="text">
                                                                            <span className="user-name">Joel King</span> is now following you
                                                                        </div>
                                                                        <span className="date">2 days ago</span>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li className="notification">
                                                                <a href="#">
                                                                    <div className="image"><img src={`${process.env.PUBLIC_URL}/assets/img/avatar4.png`} alt="Avatar" /></div>
                                                                    <div className="notification-info">
                                                                        <div className="text">
                                                                            <span className="user-name">John Doe</span> is watching your main repository
                                                                        </div>
                                                                        <span className="date">2 days ago</span>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="footer"><a href="#">View all notifications</a></div>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-expanded="false">
                                        <span className="icon mdi mdi-apps"></span>
                                    </a>
                                    <ul className="dropdown-menu be-connections">
                                        <li>
                                            <div className="list">
                                                <div className="content">
                                                    <div className="row">
                                                        <div className="col"><a className="connection-item" href="#"><img src={`${process.env.PUBLIC_URL}/assets/img/github.png`} alt="Github" /><span>GitHub</span></a></div>
                                                        <div className="col"><a className="connection-item" href="#"><img src={`${process.env.PUBLIC_URL}/assets/img/bitbucket.png`} alt="Bitbucket" /><span>Bitbucket</span></a></div>
                                                        <div className="col"><a className="connection-item" href="#"><img src={`${process.env.PUBLIC_URL}/assets/img/slack.png`} alt="Slack" /><span>Slack</span></a></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col"><a className="connection-item" href="#"><img src={`${process.env.PUBLIC_URL}/assets/img/dribbble.png`} alt="Dribbble" /><span>Dribbble</span></a></div>
                                                        <div className="col"><a className="connection-item" href="#"><img src={`${process.env.PUBLIC_URL}/assets/img/mail_chimp.png`} alt="Mail Chimp" /><span>Mail Chimp</span></a></div>
                                                        <div className="col"><a className="connection-item" href="#"><img src={`${process.env.PUBLIC_URL}/assets/img/dropbox.png`} alt="Dropbox" /><span>Dropbox</span></a></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="footer"><a href="#">More</a></div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
        adminInfo: state.admin.adminInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin);
