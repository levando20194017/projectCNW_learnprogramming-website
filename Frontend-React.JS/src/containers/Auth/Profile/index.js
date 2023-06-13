import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Information from './information';
import PostSubmission from '../Post/Submission/postSubmission';
import ListPost from '../Post/ListPost/listPost';
class Profile extends Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="profile-page-container">
                <div className="container">
                    <Information />
                    <PostSubmission />
                    <ListPost />
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
