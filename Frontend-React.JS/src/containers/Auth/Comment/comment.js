import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../../services/userService';
import { getAllLikesOfComment, handleLikeComment, handleEditComment } from '../../../services/commentService';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            likeComments: [],
            isLiked: false,
            isEditComment: false,
            contentComment: this.props.comment.content,
            stateComment: this.props.comment.content,
            userComment: {
                id: '',
                fullName: '',
                img_url: '',
            },
        };
        this.commentContentRef = React.createRef();
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
            if (responseOfLikeComment.data && responseOfLikeComment.data.errCode === 0) {
                const likeComments = responseOfLikeComment.data.likes;
                this.setState({ likeComments });
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleLikeThisComment = async (commentID) => {
        try {
            const response = await handleLikeComment(this.props.user.id, commentID);
            console.log(response);
            if (response.data.errCode === 1) {
                this.setState({ isLiked: false }); // Cập nhật giá trị isLiked dựa trên giá trị hiện tại
                const responseOfLikeComment = await getAllLikesOfComment(commentID);
                const likeComments = responseOfLikeComment?.data?.likes;
                this.setState({ likeComments: likeComments || [] });
            }
            if (response.data.errCode === 0) {
                this.setState({ isLiked: true }); // Cập nhật giá trị isLiked dựa trên giá trị hiện tại
                const responseOfLikeComment = await getAllLikesOfComment(commentID);
                const likeComments = responseOfLikeComment?.data?.likes;
                this.setState({ likeComments: likeComments || [] });
            }
        } catch (error) {
            console.log(error);
        }
    };
    handleEditComment = () => {
        this.setState({
            isEditComment: true,
            contentComment: this.state.stateComment
        })
    }
    handleSaveComment = async () => {
        try {
            const response = await handleEditComment(this.props.comment.id, this.state.contentComment, this.props.user)
            if (response.data && response.data.errCode === 0) {
                toast.success(<div style={{ width: "300px", fontSize: "14px" }}><i className="fas fa-check-circle"></i> Edit comment success!</div>, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                this.setState({
                    isEditComment: false,
                    stateComment: this.state.contentComment
                })
            } else {
                toast.error(<div style={{ width: "300px", fontSize: "14px" }}><FontAwesomeIcon icon={faExclamationTriangle} /> Edit comment failed!</div>, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                this.setState({
                    contentComment: this.state.stateComment,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    handleCancelComment = () => {
        this.setState({
            isEditComment: false,
        })
    }

    render() {
        const { comment } = this.props;
        const { likeComments, isLiked, userComment, isEditComment, contentComment, stateComment } = this.state;
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
                    {isEditComment ? <textarea
                        style={{
                            width: `${this.commentContentRef.current?.offsetWidth}px`,
                            height: `${this.commentContentRef.current?.offsetHeight}px`,
                            fontSize: "15px",
                            outline: "none",
                            border: "none",
                            backgroundColor: "#f3f2f2"
                        }}
                        value={contentComment}
                        onChange={e => this.setState({ contentComment: e.target.value })} />
                        : <p ref={this.commentContentRef}>{stateComment}</p>}

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
                                <span style={{ fontWeight: "bold", marginLeft: "-5px" }}>{likeComments && likeComments.length ? `${likeComments.length}` : ''}</span>

                            </li>
                        </ul>
                        <ul className='list-unstyled list-inline media-detail pull-right d-flex' style={{ marginLeft: "20px" }}>
                            {this.props.user.id === comment.userID ? (
                                <li className=''>{
                                    isEditComment ? (<>
                                        <span className='text-success' onClick={this.handleSaveComment}>Save</span>
                                        <span className='text-danger' onClick={this.handleCancelComment} style={{ marginLeft: "10px" }}>Cancel</span>
                                    </>
                                    ) :
                                        <span className='text-primary' onClick={this.handleEditComment}>Edit</span>
                                }
                                </li>
                            ) : (
                                ''
                            )}
                            {this.props.user.id === comment.userID ? (
                                <li className=''>
                                    <span className='text-primary'>Delete</span>
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
