import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
// import './HeaderAdmin.scss';
import '../../assets/css/app.scss'
class HeaderAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.handleDropdownClick = (dropdowns, dropdown, index) => {
            const $ = document.querySelector.bind(document);
            const $$ = document.querySelectorAll.bind(document);
            const isShow = $('.nav-item.dropdown.show');
            const isShowIndex = Array.from(dropdowns).indexOf(isShow);
            const setting = $('.be-animate');
            const dropdownMenus = $$('.dropdown-menu')
            if (index != 1) {
                if (isShowIndex == index) {
                    isShow.classList.remove('show');
                    if (index == 0) {
                        dropdownMenus[0].classList.remove('show')
                    }
                    if (index == 2) {
                        dropdownMenus[1].classList.remove('show')
                    }
                    if (index == 3) {
                        dropdownMenus[2].classList.remove('show')
                    }
                } else {
                    if (isShow) {
                        isShow.classList.remove('show');
                        if (index == 0) {
                            dropdownMenus[0].classList.remove('show')
                        }
                        if (index == 2) {
                            dropdownMenus[1].classList.remove('show')
                        }
                        if (index == 3) {
                            dropdownMenus[2].classList.remove('show')
                        }
                    }
                    dropdown.classList.add('show')
                    if (index == 0) {
                        dropdownMenus[0].classList.add('show')
                    }
                    if (index == 2) {
                        dropdownMenus[1].classList.add('show')
                    }
                    if (index == 3) {
                        dropdownMenus[2].classList.add('show')
                    }
                }
            } else {
                const isShowSetting = $('.be-animate.open-right-sidebar');
                if (isShowSetting) {
                    isShowSetting.classList.remove('open-right-sidebar')
                } else {
                    setting.classList.add('open-right-sidebar')
                }
            }

        }

    }
    // handleDropdownBlur() {
    //     const $ = document.querySelector.bind(document);
    //     const isShow = $('.nav-item.dropdown.show');
    //     if (isShow) {
    //         isShow.classList.remove('show');
    //     }
    //     const isShowMenu = $('.dropdown-menu.show');
    //     if (isShowMenu) {
    //         isShowMenu.classList.remove('show');
    //     }
    // }
    componentDidMount() {
        const $$ = document.querySelectorAll.bind(document);
        const dropdowns = $$('.nav-item.dropdown')
        Array.from(dropdowns).forEach((dropdown, index) => {
            dropdown.addEventListener('click', this.handleDropdownClick.bind(this, dropdowns, dropdown, index));
            // dropdown.addEventListener('focusout', this.handleDropdownBlur.bind(this));
        });
    }

    componentWillUnmount() {
        const dropdowns = document.querySelector('.nav-item.dropdown');
        Array.from(dropdowns).forEach(dropdown => {
            dropdown.removeEventListener('click', this.handleDropdownClick);
            // dropdown.removeEventListener('focusout', this.handleDropdownBlur);
        });
    }

    render() {
        const { processLogout, adminInfo } = this.props;
        return (
            <div class="be-wrapper be-fixed-sidebar">
                <nav className="navbar navbar-expand fixed-top be-top-header">
                    <div className="container-fluid">
                        <div className="be-navbar-header">
                            <h2 className="navbar-brand"></h2>
                            <h3 style={{ marginLeft: "-70px", marginTop: "13px" }}>CodeCrush</h3>
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
                                        <a className="dropdown-item" href="#"><span className="fas fa-user"></span><span style={{ marginLeft: "10px" }}>Account</span></a>
                                        <a className="dropdown-item" href="#"><span className="fas fa-cog"></span><span style={{ marginLeft: "10px" }}>Settings</span></a>
                                        <a className="dropdown-item" href="" onClick={processLogout}><span className="fas fa-sign-out-alt"></span><span style={{ marginLeft: "10px" }}>Logout</span></a>
                                    </div>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav float-right be-icons-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link be-toggle-right-sidebar" href="#" role="button" aria-expanded="false">
                                        <span><i class="fas fa-cog"></i></span>
                                    </a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-expanded="false">
                                        <span><i class="fas fa-bell"></i></span>
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
                                        <span><i class="fas fa-th"></i></span>
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
                <nav className="be-right-sidebar">
                    <div className="sb-content">
                        <div className="tab-navigation">
                            <ul className="nav nav-tabs nav-justified" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link active" href="#tab3" aria-controls="tab3" role="tab" data-toggle="tab" aria-selected="true">Settings</a>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-panel">
                            <div className="tab-content">
                                <div className="tab-pane tab-settings active" id="tab3" role="tabpanel">
                                    <div className="settings-wrapper">
                                        <div className="be-scroller-settings">
                                            <span className="category-title">General</span>
                                            <ul className="settings-list">
                                                <li>
                                                    <div className="switch-button switch-button-sm">
                                                        <input type="checkbox" checked name="st1" id="st1" />
                                                        <span>
                                                            <label htmlFor="st1" />
                                                        </span>
                                                    </div>
                                                    <span className="name">Available</span>
                                                </li>
                                                <li>
                                                    <div className="switch-button switch-button-sm">
                                                        <input type="checkbox" checked name="st2" id="st2" />
                                                        <span>
                                                            <label htmlFor="st2" />
                                                        </span>
                                                    </div>
                                                    <span className="name">Enable notifications</span>
                                                </li>
                                                <li>
                                                    <div className="switch-button switch-button-sm">
                                                        <input type="checkbox" checked name="st3" id="st3" />
                                                        <span>
                                                            <label htmlFor="st3" />
                                                        </span>
                                                    </div>
                                                    <span className="name">Login with Facebook</span>
                                                </li>
                                            </ul>
                                            <span className="category-title">Notifications</span>
                                            <ul className="settings-list">
                                                <li>
                                                    <div className="switch-button switch-button-sm">
                                                        <input type="checkbox" name="st4" id="st4" />
                                                        <span>
                                                            <label htmlFor="st4" />
                                                        </span>
                                                    </div>
                                                    <span className="name">Email notifications</span>
                                                </li>
                                                <li>
                                                    <div className="switch-button switch-button-sm">
                                                        <input type="checkbox" checked name="st5" id="st5" />
                                                        <span>
                                                            <label htmlFor="st5" />
                                                        </span>
                                                    </div>
                                                    <span className="name">Project updates</span>
                                                </li>
                                                <li>
                                                    <div className="switch-button switch-button-sm">
                                                        <input type="checkbox" checked name="st6" id="st6" />
                                                        <span>
                                                            <label htmlFor="st6" />
                                                        </span>
                                                    </div>
                                                    <span className="name">New comments</span>
                                                </li>
                                                <li>
                                                    <div className="switch-button switch-button-sm">
                                                        <input type="checkbox" name="st7" id="st7" />
                                                        <span>
                                                            <label htmlFor="st7" />
                                                        </span>
                                                    </div>
                                                    <span className="name">Chat messages</span>
                                                </li>
                                            </ul>
                                            <span className="category-title">Workflow</span>
                                            <ul className="settings-list">
                                                <li>
                                                    <div className="switch-button switch-button-sm">
                                                        <input type="checkbox" name="st8" id="st8" />
                                                        <span>
                                                            <label htmlFor="st8" />
                                                        </span>
                                                    </div>
                                                    <span className="name">Deploy on commit</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
