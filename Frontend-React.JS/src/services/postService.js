import axios from 'axios';

const handleAddNewPost = (userID, content, img_url) => {
    return axios.post('http://localhost:8080/api/post/add', { userID: userID, content: content, img_url: img_url });
}

const getAllPostById = (inputId) => {
    return axios.get(`http://localhost:8080/api/get-all-posts?id=${inputId}`)
}

const getAllLikesOfPost = (inputId) => {
    return axios.get(`http://localhost:8080/api/post/get-all-likes?id=${inputId}`)
}
const handleLikePost = (userID, postID) => {
    return axios.post('http://localhost:8080/api/post/isliked', { userID: userID, postID: postID });
}
const editPost = (commentID, content, user) => {
    return axios.put('http://localhost:8080/api/comment/edit', { commentID: commentID, content: content, user: user });
}
const deletePost = (commentID, user) => {
    return axios.delete('http://localhost:8080/api/comment/delete', {
        data: { commentID: commentID, user: user }
    });
}
export { handleAddNewPost, getAllPostById, getAllLikesOfPost, handleLikePost, editPost, deletePost };