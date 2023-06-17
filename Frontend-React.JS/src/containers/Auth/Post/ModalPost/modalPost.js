import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getAllCommentById, handleAddNewComment } from '../../../../services/commentService';
import moment from 'moment';
import './style.scss'
import CommentForm from '../../Comment/comment'
class ModalPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCommentDisabled: true,
            message: '',
            contentComment: '',
            listComments: [],
            comment: {
                id: '',
                userID: '',
                content: '',
                createdAt: '',
            },
        };
    }

    componentDidMount() {
        if (this.props.isOpen) {
            this.fetchData();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isOpen && !prevProps.isOpen) {
            this.fetchData();
        }
    }

    fetchData = async () => {
        try {
            const data = await getAllCommentById(this.props.postId);
            if (data.data && data.data.errCode === 0) {
                this.setState({ listComments: data.data.comments });
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleAddComment = async () => {
        try {
            const response = await handleAddNewComment(
                this.props.userID,
                this.state.contentComment,
                this.props.postId
            );

            if (response.data && response.data.errCode === 0) {
                this.setState({ message: response.data.message, contentComment: '' });
            } else if (response.data && response.data.errCode !== 0) {
                this.setState({ message: response.data.message });
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {
            isOpen,
            toggleFromParent,
            userID,
            postId,
            author,
            img_urlAuthor,
            createdAt,
            content,
            img_urlPost,
            likePosts,
            isLiked,
        } = this.props;

        const {
            isCommentDisabled,
            message,
            contentComment,
            listComments,
        } = this.state;

        const numberOfComment = listComments.length;
        return (
            <Modal
                isOpen={isOpen}
                toggle={() => toggleFromParent()}
                className={'modal-post-container'}
                size='lg'
                centered
            >
                <ModalHeader toggle={() => toggleFromParent()}>
                    <div style={{ fontWeight: "400" }}>Post of</div>
                    <div style={{ marginLeft: "5px", fontWeight: "bold" }}>{author}</div>
                </ModalHeader>
                <Scrollbars style={{ height: "72vh" }}>
                    <ModalBody>
                        <div className='modal-post-body'>
                            <div className="main-profile" style={{ marginTop: "-42px", padding: "10px" }}>
                                <div className="profile-main-body">
                                    <div className="row">
                                        <div className="mt-2" style={{ padding: "0 30px" }}>
                                            <div className=" d-flex mt-4">
                                                <div className="col-11 d-flex">
                                                    <div>
                                                        <img src={img_urlAuthor} alt="Admin" className="rounded-circle"
                                                            width="50" height={50} />
                                                    </div>
                                                    <div style={{ marginLeft: "8px" }}>
                                                        <div style={{ fontWeight: "bold" }} className="author">{author}</div>
                                                        <div className="text-secondary">{moment(`${createdAt}`).format('HH:mm DD/MM/YYYY')}. <i className="fas fa-globe-asia"></i></div>
                                                    </div>
                                                </div>
                                                <div className=" col-1" style={{ fontSize: "30px", marginLeft: "50px" }}>
                                                    <i className="fas fa-ellipsis-h"></i>
                                                </div>
                                            </div>
                                            <div className="post-content">
                                                <div className="content">
                                                    {content}
                                                </div>
                                                <div className="image mt-3">
                                                    <img src={img_urlPost} alt="Avatar" />
                                                </div>
                                                <div className="d-flex mt-3" style={{ justifyContent: "space-between" }}>
                                                    <div className="number-of-likes d-flex">
                                                        {likePosts && (likePosts.length >= 1 ? <div style={{ width: "35px", height: "35px", borderRadius: "50%", backgroundColor: "blue", justifyContent: "center", alignItems: "center", display: "flex" }}>
                                                            <i className="fas fa-thumbs-up" style={{ fontSize: "20px", color: "white" }}></i>
                                                        </div> : "")}
                                                        <div style={{ fontWeight: "600", marginTop: "6px", fontSize: "18px", marginLeft: "10px" }}>
                                                            {likePosts && (likePosts.length > 1 ? `${likePosts.length} likes` : likePosts.length ? `${likePosts.length} like` : "")}
                                                        </div>
                                                    </div>
                                                    <div className="number-of-comments">
                                                        <div style={{ fontWeight: "600", marginTop: "6px", fontSize: "18px", marginLeft: "10px" }}>
                                                            {numberOfComment > 1 ? `${numberOfComment} comments` : numberOfComment ? `${numberOfComment} comment` : ""}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="post-action" style={{ padding: "0 30px" }}>
                                                <hr />
                                                <div className="d-flex" style={{ justifyContent: "space-between", padding: "0 100px", marginTop: "-10px" }}>
                                                    {isLiked ? (<div className="like text-secondary">
                                                        <i className="fas fa-thumbs-up" style={{ color: "blue" }}></i> <span style={{ color: "blue" }}>Like</span>
                                                    </div>) :
                                                        (<div className="like text-secondary" >
                                                            <i className="fas fa-thumbs-up" ></i> Like
                                                        </div>)}
                                                    <div className="comment text-secondary">
                                                        <i className="fas fa-comment-alt"></i> Comment
                                                    </div>
                                                    <div className="share text-secondary">
                                                        <i className="fas fa-share"></i> Share
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="content-item" id="comments">
                                                <div className="d-flex">
                                                    <div className="row">
                                                        <div className="">
                                                            <h3>{numberOfComment > 1 ? `${numberOfComment} comments` : numberOfComment ? `${numberOfComment} comment` : ""}</h3>
                                                            {listComments && listComments.map((comment, index) => {
                                                                return <div>
                                                                    <CommentForm
                                                                        comment={comment}
                                                                        userID={userID}
                                                                        index={index} />
                                                                </div>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Scrollbars>
                <ModalFooter>
                    <div className='media d-flex form-input-comment' style={{ width: "100%" }}>
                        <a className="pull-left" href="#"><img className="rounded-circle"
                            width="50" height={50}
                            src={img_urlAuthor} alt="" /></a>
                        <div className="input-comment">
                            <input className='input-comment__form' placeholder='Post a comment...'
                            // value={contentComment} onChange={e => setContentComment(e.target.value)} 

                            />
                            <div className='d-flex' style={{ justifyContent: "space-between", marginTop: "30px" }}>
                                <div className='d-flex input-comment__icons'>
                                    <i className="fas fa-camera" style={{ color: "gray" }}></i>
                                    <i className="far fa-kiss-wink-heart" style={{ color: "orange" }}></i>
                                    <i className="fas fa-gift" style={{ color: "red" }}></i>
                                    <i className="fas fa-sticky-note" style={{ color: "green" }}></i>
                                </div>
                                <button disabled={isCommentDisabled} style={{ outline: "none", border: "none" }} onClick={this.handleAddComment}>
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalPost);
