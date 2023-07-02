import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/Users/UserManage';
import UserProgress from '../containers/System/Users/UserProgress';
import CourseManage from '../containers/System/Courses/CourseManage';
import LessonManage from '../containers/System/Courses/LessonManage';
import VideoManage from '../containers/System/Courses/VideoManage';
import PostManage from '../containers/System/Posts/PostManage';
import CommentManage from '../containers/System/Posts/CommentManage';
import HeaderAdmin from '../containers/Header/HeaderAdmin';
import Sidebar from '../containers/Sidebar';


class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                {this.props.adminIsLoggedIn && <HeaderAdmin />}
                {this.props.adminIsLoggedIn && <Sidebar />}
                <div className="system-list">
                    <Switch>
                        {/* <Route path="/system/home" component={Home} /> */}
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-progress" component={UserProgress} />

                        <Route path="/system/course-manage" component={CourseManage} />
                        <Route path="/system/lesson-manage" component={LessonManage} />
                        <Route path="/system/video-manage" component={VideoManage} />

                        <Route path="/system/post-manage" component={PostManage} />
                        <Route path="/system/comment-manage" component={CommentManage} />


                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        adminIsLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
