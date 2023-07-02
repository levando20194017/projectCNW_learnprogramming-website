import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { path } from '../utils';
import ForgotPassword from '../containers/Auth/ForgotPassword/ForgotPassword';
import SignUp from '../containers/Auth/SignUp/signup';
import ChangePassword from '../containers/Auth/ChangePassword/changePassword';
import EnrollmentCourse from '../containers/Auth/EnrollmentCourse';
import Blog from '../containers/Auth/Blog';
import CourseList from '../containers/System/CourseList/CourseList';
import Profile from '../containers/Auth/Profile';
import Learn from '../containers/Auth/Learn';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import Login from '../containers/Auth/Login/Login';
import D_header_user from '../containers/Header/D_header_user';
import Footer from '../containers/Footer';
import MyCourse from '../containers/Auth/MyCourse';
import AboutUs from '../containers/Auth/AboutUs/AboutUs.js';
class SystemOfUser extends Component {
    userData = JSON.parse(localStorage.getItem("persist:user"));
    render() {
        const { systemMenuPath } = this.props;
        return (

            <span className="content-container">
                {this.userData.isLoggedIn && <D_header_user />}
                <Switch>
                    {/* <Route path="/system/home" component={Home} /> */}
                    {/* <Route path={path.HOME} exact component={HomePage} /> */}
                    {/* <Route path={"/forgotpassword"} component={ForgotPassword} />
                    <Route path={"/signup"} component={SignUp} />
                    <Route path={"/changepassword"} component={ChangePassword} /> */}
                    <Route path={"/course/:id"} component={EnrollmentCourse} />
                    <Route path={"/blog"} component={Blog} />
                    <Route path={"/home"} component={CourseList} />
                    <Route path={"/profile/:id"} component={Profile} />
                    <Route path={"/mycourses"} component={MyCourse} />
                    <Route path={"/aboutus"} component={AboutUs} />
                    {/* <Route path={"/learn/:id"} component={Learn} /> */}
                    {/* <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} /> */}
                    {/* <Route component={() => { return (<Redirect to={systemMenuPath} />) }} /> */}
                </Switch>
                {this.userData.isLoggedIn && <Footer />}
            </span>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        userIsLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemOfUser);
