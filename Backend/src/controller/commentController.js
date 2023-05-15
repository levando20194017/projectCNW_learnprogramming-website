import commentService from '../services/commentService'
let handleGetAllComments = async (req, res) => {
    let id = req.query.id; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters",
            comment: []
        })
    }
    let comments = await commentService.getAllPosts(id);
    return res.status(200).json({
        errCode: 0,
        message: 'Ok',
        comments
    })
}
let handleCreateNewComment = async (req, res) => {
    let message = await commentService.createNewComment(req.body, req.session.user.id);
    console.log(message);
    return res.status(200).json(message)
}
let handleDeleteComment = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await commentService.deleteComment(req.body.id, req.session.user);
    return res.status(200).json(message)
}
let handleEditComment = async (req, res) => {
    let data = req.body;
    let message = await commentService.updateCommentData(data, req.session.user)
    return res.status(200).json(message)
}
module.exports = {
    handleGetAllComments: handleGetAllComments,
    handleCreateNewPost: handleCreateNewComment,
    handleDeleteComment: handleDeleteComment,
    handleEditComment: handleEditComment
}