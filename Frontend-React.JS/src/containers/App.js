import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated, adminIsAuthenticated, adminIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

// import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/Login/Login';
import SignUp from './Auth/SignUp/signup';
import ForgotPassword from './Auth/ForgotPassword/ForgotPassword';
import HeaderAdmin from './Header/HeaderAdmin';
import System from '../routes/System';
import HomePage from './System/home/HomePage'
// import ForgotPassword from './ForgotPassword';
import Sidebar from './Sidebar';
import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';

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
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />
                        {this.props.adminIsLoggedIn && <HeaderAdmin />}
                        {this.props.adminIsLoggedIn && <Sidebar />}

                        <span className="content-container">
                            <Switch>
                                <Route path={path.HOME} exact component={HomePage} />
                                <Route path={"/forgotpassword"} component={ForgotPassword} />
                                <Route path={"/signup"} component={SignUp} />
                                <Route path={path.LOGIN} component={adminIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={adminIsAuthenticated(System)} />
                            </Switch>
                        </span>

                        <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        />
                    </div>
                </Router>
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