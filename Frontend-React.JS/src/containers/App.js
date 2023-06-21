import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated, adminIsAuthenticated, adminIsNotAuthenticated } from '../hoc/authentication';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { path } from '../utils';
import Login from './Auth/Login/Login';
import SignUp from './Auth/SignUp/signup';
import Profile from './Auth/Profile/index';
import ChangePassword from './Auth/ChangePassword/changePassword';
import ForgotPassword from './Auth/ForgotPassword/ForgotPassword';
import HeaderAdmin from './Header/HeaderAdmin';
import System from '../routes/System';
import HomePage from './System/home/HomePage';
import Blog from './Auth/Blog';
import Sidebar from './Sidebar';
import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import EnrollmentCourse from './Auth/EnrollmentCourse';
import Learn from './Auth/Learn';
import D_header_user from './Header/D_header_user';
import CourseList from "./System/CourseList/CourseList";
import Test from './Auth/Test';
import Footer from './Footer';
import './style.scss'
class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        const { location } = history;
        return (
            <Fragment>
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames="fade" timeout={300}>
                        <Router history={history}>
                            <div className="main-container">
                                <ConfirmModal />
                                {/* {this.props.userIsLoggedIn && location.pathname !== "/login" && location.pathname !== "/signup"
                            && location.pathname !== "/changepassword"
                            && location.pathname !== "/forgotpassword"
                            && <D_header_user />} */}
                                {this.props.adminIsLoggedIn && <HeaderAdmin />}
                                {this.props.adminIsLoggedIn && <Sidebar />}
                                <span className="content-container">

                                    <Switch>
                                        <Route path={path.HOME} exact component={HomePage} />
                                        <Route path={"/test"} component={Test} />
                                        <Route path={"/forgotpassword"} component={ForgotPassword} />
                                        <Route path={"/changepassword"} component={ChangePassword} />
                                        <Route path={"/course/:id"} component={EnrollmentCourse} />
                                        <Route path={"/blog"} component={Blog} />
                                        <Route path={"/home"} component={CourseList} />
                                        <Route path={"/signup"} component={SignUp} />
                                        <Route path={"/profile"} component={Profile} />
                                        <Route path={"/learn/:id"} component={Learn} />
                                        <Route path={path.LOGIN} component={adminIsNotAuthenticated(Login)} />
                                        <Route path={path.SYSTEM} component={adminIsAuthenticated(System)} />
                                    </Switch>

                                </span>
                                {/* {this.props.userIsLoggedIn && location.pathname !== "/blog" && location.pathname !== "/login"
                            && location.pathname !== "/signup"
                            && location.pathname !== "/changepassword"
                            && location.pathname !== "/forgotpassword"
                            && location.pathname !== "/learn/:id"
                            && <Footer />} */}
                                <ToastContainer
                                    className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                                    autoClose={false} hideProgressBar={true} pauseOnHover={false}
                                    pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                                    closeButton={<CustomToastCloseButton />}
                                />
                            </div>
                        </Router>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        userIsLoggedIn: state.user.isLoggedIn,
        adminIsLoggedIn: state.admin.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);