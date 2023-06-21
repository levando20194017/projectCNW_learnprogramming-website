import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
class userHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPageTwo: false
        }
    }

    handleClick = () => {
        this.setState({ showPageTwo: !this.state.showPageTwo });
    }

    render() {
        const { processLogout, userInfo } = this.props;
        return (
            <div>
                <button onClick={this.handleClick}>Toggle Page</button>
                <CSSTransition
                    in={this.state.showPageTwo}
                    classNames="fade"
                    timeout={900}
                    unmountOnExit
                >
                    <div>
                        <h1>Page Two</h1>
                        <p>This is page two.</p>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!this.state.showPageTwo}
                    classNames="fade"
                    timeout={900}
                    unmountOnExit
                >
                    <div>
                        <h1>Page One</h1>
                        <p>This is page one.</p>
                    </div>
                </CSSTransition>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(userHeader);
