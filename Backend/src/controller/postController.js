import postService from '../services/postService'
let handleGetAllPosts = async (req, res) => {
    let id = req.query.id; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters",
            post: []
        })
    }
    let posts = await postService.getAllPosts(id);
    return res.status(200).json({
        errCode: 0,
        message: 'Ok',
        posts
    })
}
let handleCreateNewPost = async (req, res) => {
    req.body.userID = req.session.user.id;
    let message = await postService.createNewPost(req.body);
    console.log(message);
    return res.status(200).json(message)
}
let handleDeletePost = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await postService.deletePost(req.body.id, req.session.user);
    return res.status(200).json(message)
}
let handleEditPost = async (req, res) => {
    let data = req.body;
    let message = await postService.updatePostData(data, req.session.user)
    return res.status(200).json(message)
}
module.exports = {
    handleGetAllPosts: handleGetAllPosts,
    handleCreateNewPost: handleCreateNewPost,
    handleDeletePost: handleDeletePost,
    handleEditPost: handleEditPost
}