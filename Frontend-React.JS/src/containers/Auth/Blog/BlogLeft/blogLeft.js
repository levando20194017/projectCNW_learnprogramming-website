import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllPostById } from '../../../../services/postService';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs, Button, Offcanvas } from 'react-bootstrap';
class BlogLeft extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listPosts: [],
            open: false
        };
    }
    userData = JSON.parse(localStorage.getItem("persist:user"));
    userInfo = JSON.parse(this.userData.userInfo);
    componentDidMount() {
        this.fetchData(this.userInfo.id);
    }

    componentWillUnmount() {
        //  Hủy bỏ bất kỳ kết nối hoặc tài nguyên nào đang chạy
        //  để tránh lỗi "memory leaks"
    }

    async fetchData(userId) {
        try {
            const data = await getAllPostById(userId);
            if (data.data && data.data.errCode === 0) {
                this.setState({ listPosts: data.data.posts });
            }
        } catch (error) {
            console.log(error);
        }
    }



    render() {
        return (
            <>
                <div className="col-lg-3">
                    <div className="d-flex align-items-center d-lg-none">
                        <button className="border-0 bg-transparent" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSideNavbar" aria-controls="offcanvasSideNavbar">
                            <span className="btn btn-primary">
                                <i className="fa-solid fa-sliders-h"></i>
                            </span>
                            <span className="h6 mb-0 fw-bold d-lg-none ms-2">My profile</span>
                        </button>
                    </div>
                    <nav className="navbar navbar-expand-lg mx-0">
                        <div className="offcanvas offcanvas-start show" tabIndex={-1} id="offcanvasSideNavbar" aria-modal="true" role="dialog">
                            <div className="offcanvas-header">
                                <button type="button" className="btn-close text-reset ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body d-block px-2 px-lg-0">
                                <div className="cardx">
                                    <div className="card-body pt-0">
                                        <div className="h-50px"></div>
                                        <div className="text-center">
                                            <div className="avatar avatar-lg mt-n5 mb-3">
                                                <Link to="/profile">
                                                    <img className="rounded-circle" src={this.userInfo.img_url} alt="Avatar" width={75} height={75} />
                                                </Link>
                                            </div>
                                            <h5 className="mb-0">
                                                <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>{this.userInfo.fullName}</Link>
                                            </h5>
                                            <div className="hstack gap-2 gap-xl-3 justify-content-center mt-3">
                                                <div>
                                                    <h6 className="mb-0">{this.state.listPosts.length}</h6>
                                                    <small>Post</small>
                                                </div>
                                                <div className="vr"></div>
                                                <div>
                                                    <h6 className="mb-0">2.06k</h6>
                                                    <small>Followers</small>
                                                </div>
                                                <div className="vr"></div>
                                                <div>
                                                    <h6 className="mb-0">200</h6>
                                                    <small>Following</small>
                                                </div>
                                            </div>
                                            <hr />
                                            <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
                                                <li className="nav-item">
                                                    <a className="nav-link">
                                                        <i className="bi bi-house-heart-fill me-2 h-20px fa-fw"></i>
                                                        <span>Feeds</span>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link">
                                                        <i className="bi bi-people me-2 h-20px fa-fw"></i>
                                                        <span>Friends</span>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link">
                                                        <i className="bi bi-diagram-3 me-2 h-20px fa-fw"></i>
                                                        <span>Groups</span>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link">
                                                        <i className="bi bi-clipboard-pulse me-2 h-20px fa-fw"></i>
                                                        <span>Pages</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-footer text-center py-2">
                                            <Link to="/profile">
                                                <a className="btn btn-link btn-sm text-primary">View profile</a>
                                            </Link>
                                        </div>
                                    </div>
                                    <ul className="nav small mt-4 justify-content-center lh-1">
                                        <li className="nav-item">
                                            <a className="nav-link">About</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link">Settings</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link">Support</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link">Help</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link">Privacy & terms </a>
                                        </li>
                                    </ul>
                                    <p className="small text-center mt-1">©2023 CodeCrush</p>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                {/* <>
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="Home">
                            <p>Content for home tab goes here.</p>
                        </Tab>
                        <Tab eventKey="profile" title="Profile">
                            <p>Content for profile tab goes here.</p>
                        </Tab>
                        <Tab eventKey="contact" title="Contact">
                            <p>Content for contact tab goes here.</p>
                        </Tab>
                    </Tabs>
                    <Button variant="primary" onClick={() => this.setState({
                        open: true
                    })}>
                        Open Profile
                    </Button>
                    <Offcanvas show={this.state.open} onHide={() => this.setState({
                        open: false
                    })} placement="start">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>My Profile</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <p>Content for profile goes here.</p>
                        </Offcanvas.Body>
                    </Offcanvas>
                </> */}
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogLeft);
