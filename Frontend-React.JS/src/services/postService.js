import axios from 'axios';

const handleAddNewPost = (userID, content, img_url) => {
    return axios.post('http://localhost:8080/api/post/add', { userID: userID, content: content, img_url: img_url });
}

const getAllPostById = (inputId) => {
    return axios.get(`/api/get-all-posts?id=${inputId}`)
}

const getAllLikesOfPost = (inputId) => {
    return axios.get(`/api/post/get-all-likes?id=${inputId}`)
}
const handleLikePost = (userID, postID) => {
    return axios.post('/api/post/isliked', { userID: userID, postID: postID });
}
export { handleAddNewPost, getAllPostById, getAllLikesOfPost, handleLikePost };