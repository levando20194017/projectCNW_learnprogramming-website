import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Spinner from "react-bootstrap/Spinner";
import { getAllPostById, getAllLikesOfPost, handleLikePost } from '../../../../services/postService';
import { getAllCommentById, handleDeleteComment, handleAddNewComment, handleEditComment } from '../../../../services/commentService';
import './style.scss'
import moment from 'moment';
import ModalPost from '../ModalPost/modalPost';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
class ListPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userData: this.props.userInfo,
            listPosts: [],
            listComments: [],
            likePosts: [],
            isLiked: [],
            post: {
                id: "",
                content: "",
                img_url: "",
                createdAt: "",
                isOpenModalComment: false
            },
            showDropdown: [],
        };
    }
    handleAddNewComment = (post) => {
        const updatedPost = { ...post, isOpenModalComment: true };
        this.setState({
            listPosts: this.state.listPosts.map(p => p.id === post.id ? updatedPost : p),
        });
    }
    toggleCommentModal = (post) => {
        const updatedPost = { ...post, isOpenModalComment: !post.isOpenModalComment };
        this.setState({
            listPosts: this.state.listPosts.map(p => p.id === post.id ? updatedPost : p),
        });
    };

    handleDropdownClick = (post, index) => {
        const newShowDropdown = [...this.state.showDropdown];
        newShowDropdown[index] = !newShowDropdown[index];
        this.setState({
            showDropdown: newShowDropdown,
        });
    };

    handleEditClick = (post, index) => {
        console.log('Edit selected for post:', post);
        const newShowDropdown = [...this.state.showDropdown];
        newShowDropdown[index] = false;
        this.setState({
            showDropdown: newShowDropdown,
        });
    };

    handleDeleteClick = (post, index) => {
        console.log('Delete selected for post:', post);
        const newShowDropdown = [...this.state.showDropdown];
        newShowDropdown[index] = false;
        this.setState({
            showDropdown: newShowDropdown,
        });
    };
    userData = JSON.parse(localStorage.getItem("persist:user"));
    userInfo = JSON.parse(this.userData.userInfo);
    componentDidMount() {
        let isMounted = true;
        const fetchData = async () => {
            const data = await getAllPostById(this.userInfo.id);
            this.setState({
                listPosts: data.data.posts,
            });
            if (isMounted) {
                let commentsArray = [];
                let likePostsArray = [];
                for (let i = 0; i < data.data.posts.length; i++) {
                    const response = await getAllCommentById(data.data.posts[i].id);
                    const comments = response.data.comments;
                    commentsArray.push(comments);

                    const responseOfLikePost = await getAllLikesOfPost(data.data.posts[i].id);
                    const likeposts = responseOfLikePost.data.likes;
                    likePostsArray.push(likeposts);
                }
                this.setState({
                    listComments: commentsArray,
                    likePosts: likePostsArray,
                });
            }
        };
        fetchData();
        return () => {
            isMounted = false;
        };
    }
    // Lưu trạng thái like của bài viết vào localStorage
    handleLikeThisPost = async (index, postID) => {
        const response = await handleLikePost(this.userInfo.id, postID);
        if (response.data.errCode === 1) {
            const newIsLiked = [...this.state.isLiked];
            newIsLiked[index] = false;
            this.setState({
                isLiked: newIsLiked,
            });
            localStorage.setItem(postID, false.toString()); // Lưu giá trị false vào localStorage

            const likePostsArray = [...this.state.likePosts]
            const responseOfLikePost = await getAllLikesOfPost(postID);
            const likeposts = responseOfLikePost.data.likes;
            likePostsArray[index] = likeposts;
            this.setState({
                likePosts: likePostsArray,
            });
        }
        if (response.data.errCode === 0) {
            const newIsLiked = [...this.state.isLiked];
            newIsLiked[index] = true;
            this.setState({
                isLiked: newIsLiked,
            });
            localStorage.setItem(postID, true.toString()); // Lưu giá trị true vào localStorage

            const likePostsArray = [...this.state.likePosts]
            const responseOfLikePost = await getAllLikesOfPost(postID);
            const likeposts = responseOfLikePost.data.likes;
            likePostsArray[index] = likeposts;
            this.setState({
                likePosts: likePostsArray,
            });
        }
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.state.listPosts !== prevState.listPosts) {
            const newIsLiked = [...this.state.isLiked];
            this.state.listPosts.forEach((post, index) => {
                const isPostLiked = localStorage.getItem(post.id); // Lấy giá trị trạng thái like từ localStorage
                if (isPostLiked === "true") {
                    newIsLiked[index] = true;
                }
            });
            this.setState({
                isLiked: newIsLiked,
            });
        }
    }
    onDeleteComment = async (postIndex, commentIndex, postId) => {
        console.log(this.state.listComments[postIndex][commentIndex]);
        try {
            const response = await handleDeleteComment(this.state.listComments[postIndex][commentIndex].id, this.userInfo)
            if (response.data && response.data.errCode === 0) {
                toast.success(<div style={{ width: "300px", fontSize: "14px" }}><i className="fas fa-check-circle"></i> Delete comment success!</div>, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                const newListComments = await this.getAllComments(postId); // Sử dụng await để đợi hàm getAllComments hoàn thành
                const updatedListComments = [...this.state.listComments];
                updatedListComments[postIndex] = newListComments;
                console.log(updatedListComments[postIndex]);
                this.setState({
                    listComments: updatedListComments
                });
            } else {
                toast.error(<div style={{ width: "300px", fontSize: "14px" }}><FontAwesomeIcon icon={faExclamationTriangle} /> Delete comment failed!</div>, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    getAllComments = async (postId) => {
        const response = await getAllCommentById(postId)
        if (response.data && response.data.errCode === 0) {
            console.log(response.data.comments);
            return response.data.comments
        }
    }
    onAddNewComment = async (contentComment, postIndex, postId) => {
        try {
            const response = await handleAddNewComment(this.userInfo.id, contentComment, postId)
            if (response.data && response.data.errCode === 0) {
                toast.success(<div style={{ width: "300px", fontSize: "14px" }}><i className="fas fa-check-circle"></i> Add new comment success!</div>, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                const newListComments = await this.getAllComments(postId); // Sử dụng await để đợi hàm getAllComments hoàn thành
                const updatedListComments = [...this.state.listComments];
                updatedListComments[postIndex] = newListComments;

                this.setState({
                    listComments: updatedListComments
                });
            } else if (response.data && response.data.errCode !== 0) {
                toast.error(<div style={{ width: "300px", fontSize: "14px" }}><FontAwesomeIcon icon={faExclamationTriangle} /> Add comment failed!</div>, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    onSaveComment = async (commentID, contentComment, postId, postIndex) => {
        try {
            const response = await handleEditComment(commentID, contentComment, this.userInfo)
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
                const newListComments = await this.getAllComments(postId); // Sử dụng await để đợi hàm getAllComments hoàn thành
                const updatedListComments = [...this.state.listComments];
                updatedListComments[postIndex] = newListComments;

                this.setState({
                    listComments: updatedListComments
                });
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
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        const userInfo = this.userInfo
        return (
            <div className="main-profile" style={{ marginTop: "-42px", padding: "10px" }}>
                <div className="profile-main-body">
                    <div className="row">
                        {this.state.listPosts.length > 0 ? (
                            this.state.listPosts.map((post, index) => {
                                return (
                                    <div className="card mt-2" style={{ padding: "0 30px" }}>
                                        <div className="card-body d-flex mt-4">
                                            <div className="col-11 d-flex">
                                                <div>
                                                    <img src={userInfo?.img_url} alt="Admin" className="rounded-circle"
                                                        width="50" height={50} />
                                                </div>
                                                <div style={{ marginLeft: "8px" }}>
                                                    <div style={{ fontWeight: "bold" }} className="author">{userInfo?.fullName}</div>
                                                    <div className="text-secondary">{moment(`${post.createdAt}`).format('HH:mm DD/MM/YYYY')}. <i className="fas fa-globe-asia"></i></div>
                                                </div>
                                            </div>
                                            <div className=" col-1" style={{ fontSize: "30px", marginLeft: "50px" }}>
                                                <div className="dropdown">
                                                    <i className="fas fa-ellipsis-h" onClick={() => this.handleDropdownClick(post, index)}></i>
                                                    {this.state.showDropdown[index] && (
                                                        <div className="dropdown-content">
                                                            <div onClick={() => this.handleEditClick(post, index)} style={{ borderBottom: "1px solid gray" }}>Edit</div>
                                                            <div onClick={() => this.handleDeleteClick(post, index)}>Delete</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="post-content">
                                            <div className="content">
                                                {post.content}
                                            </div>
                                            <div className="image mt-3">
                                                <img src={post.img_url} alt="Avatar" />
                                            </div>
                                            <div className="d-flex mt-3" style={{ justifyContent: "space-between" }}>
                                                <div className="number-of-likes d-flex">
                                                    {this.state.likePosts[index] && (this.state.likePosts[index].length >= 1 ? <div style={{ width: "35px", height: "35px", borderRadius: "50%", backgroundColor: "blue", justifyContent: "center", alignItems: "center", display: "flex" }}>
                                                        <i className="fas fa-thumbs-up" style={{ fontSize: "20px", color: "white" }}></i>
                                                    </div> : "")}
                                                    <div style={{ fontWeight: "600", marginTop: "6px", fontSize: "18px", marginLeft: "10px" }}>
                                                        {this.state.likePosts[index] && (this.state.likePosts[index].length > 1 ? `${this.state.likePosts[index].length} likes` : this.state.likePosts[index].length ? `${this.state.likePosts[index].length} like` : "")}
                                                    </div>
                                                </div>
                                                <div className="number-of-comments">
                                                    <div style={{ fontWeight: "600", marginTop: "6px", fontSize: "18px", marginLeft: "10px" }}>
                                                        {this.state.listComments[index] && (this.state.listComments[index].length > 1 ? `${this.state.listComments[index].length} comments` : this.state.listComments[index].length ? `${this.state.listComments[index].length} comment` : "")}
                                                    </div>
                                                    <ModalPost
                                                        isOpen={post.isOpenModalComment}
                                                        toggleFromParent={() => this.toggleCommentModal(post)}
                                                        user={userInfo}
                                                        isLiked={this.state.isLiked[index]}
                                                        likePosts={this.state.likePosts[index]}
                                                        numberOfComment={this.state.listComments[index] ? this.state.listComments[index].length : 0}
                                                        post={post}
                                                        onDeleteComment={(commentIndex) => this.onDeleteComment(index, commentIndex, post.id)}
                                                        onAddNewComment={(contentComment) => this.onAddNewComment(contentComment, index, post.id)}
                                                        onSaveComment={(commentID, contentComment) => this.onSaveComment(commentID, contentComment, post.id, index)}
                                                        listComments={this.state.listComments[index]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="post-action" style={{ padding: "0 30px" }}>
                                            <hr />
                                            <div className="d-flex" style={{ justifyContent: "space-between", padding: "0 100px", marginTop: "-10px" }}>
                                                {this.state.isLiked[index] ? (<div className="like text-secondary" onClick={() => this.handleLikeThisPost(index, post.id)}>
                                                    <i className="fas fa-thumbs-up" style={{ color: "blue" }}></i> <span style={{ color: "blue" }}>Like</span>
                                                </div>) :
                                                    (<div className="like text-secondary" onClick={() => this.handleLikeThisPost(index, post.id)}>
                                                        <i className="fas fa-thumbs-up" ></i> Like
                                                    </div>)}
                                                <div className="comment text-secondary" onClick={() => this.handleAddNewComment(post)}>
                                                    <i className="fas fa-comment-alt"></i> Comment
                                                </div>
                                                <div className="share text-secondary">
                                                    <i className="fas fa-share"></i> Share
                                                </div>
                                            </div>
                                            <hr style={{ marginTop: "9px" }} />
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPost);
