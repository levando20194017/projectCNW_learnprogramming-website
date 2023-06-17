// import './style.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../../services/userService';
import { getAllLikesOfComment, handleLikeComment } from '../../../services/commentService';
import moment from 'moment';
class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            likeComments: [],
            isLiked: false,
            userComment: {
                id: '',
                fullName: '',
                img_url: '',
            },
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.comment.userID !== this.props.comment.userID ||
            prevProps.comment.id !== this.props.comment.id
        ) {
            this.fetchData();
        }
    }

    fetchData = async () => {
        try {
            const data = await getAllUsers(this.props.comment.userID);
            if (data && data.errCode === 0) {
                const userComment = data.users;
                this.setState({ userComment });
            }

            const responseOfLikeComment = await getAllLikesOfComment(this.props.comment.id);
            if (responseOfLikeComment && responseOfLikeComment.errCode === 0) {
                const likeComments = responseOfLikeComment.likes;
                this.setState({ likeComments });
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleLikeThisComment = async (commentID) => {
        if (this.state.isLiked) return; // Kiểm tra giá trị isLiked hiện tại trước khi gửi request
        console.log(commentID, this.props.userID);

        try {
            const response = await handleLikeComment(this.props.userID, commentID);
            if (response.data.errCode === 1) {
                this.setState({ isLiked: !this.state.isLiked }); // Cập nhật giá trị isLiked dựa trên giá trị hiện tại
                const responseOfLikeComment = await getAllLikesOfComment(commentID);
                const likeComments = responseOfLikeComment?.data?.likes;
                this.setState({ likeComments: likeComments || [] });
            } else {
                console.log('Error'); // Xử lý lỗi ở đây
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const { comment } = this.props;
        const { likeComments, isLiked, userComment } = this.state;
        return (
            <div className='media d-flex'>
                <a className='pull-left' href='#'>
                    <img
                        className='rounded-circle'
                        width='50'
                        height='50'
                        src={userComment.img_url}
                        alt=''
                    />
                </a>
                <div className='media-body'>
                    <h6 className='media-heading'>{userComment.fullName}</h6>
                    <p>{comment.content}</p>
                    <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                        <ul className='list-unstyled list-inline media-detail pull-lef d-flex'>
                            <li>
                                <i className='fa fa-calendar'></i>
                                {moment(`${comment.createdAt}`).format('HH:mm DD/MM/YYYY')}.
                            </li>
                            <li>
                                {isLiked ? (
                                    <i
                                        className='fa fa-thumbs-up'
                                        style={{ color: 'blue' }}
                                        onClick={() => {
                                            this.handleLikeThisComment(comment.id);
                                        }}
                                    ></i>
                                ) : (
                                    <i
                                        className='fa fa-thumbs-up'
                                        onClick={() => {
                                            this.handleLikeThisComment(comment.id);
                                        }}
                                    ></i>
                                )}
                                {likeComments && likeComments.length ? `${likeComments.length}` : ''}
                            </li>
                        </ul>
                        <ul className='list-unstyled list-inline media-detail pull-right d-flex'>
                            {this.props.userID === comment.userID ? (
                                <li>
                                    <a href=''>Edit</a>
                                </li>
                            ) : (
                                ''
                            )}
                            {this.props.userID === comment.userID ? (
                                <li className=''>
                                    <a href=''>Delete</a>
                                </li>
                            ) : (
                                ''
                            )}
                        </ul>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
