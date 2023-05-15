import db from '../models/index'
let getAllComments = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let comments = '';
            if (userId == 'ALL') {
                comments = await db.Comment.findAll()
            }
            if (userId && userId !== 'ALL') {
                comments = await db.Comment.findAll({
                    where: { userID: userId },
                })
            }
            resolve(comments);
        } catch (e) {
            reject(e);
        }
    })
}
let createNewComment = (data, userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userID) {
                await db.Post.create({
                    userID: userID,
                    postID: data.postID,
                    content: data.content,
                    img_url: data.img_url,
                    date: data.date
                })
                resolve({
                    errCode: 0,
                    message: "Add new comment success",
                });
            } else {
                resolve({
                    errCode: 1,
                    message: "You need to login to perform this function",
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteComment = (commentID, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let comment = db.Comment.findOne({
                where: { id: commentID }
            })
            if (comment) {
                if (user.role === true || user.id === comment.userID) {
                    await db.Comment.destroy({
                        where: { id: commentID }
                    });
                    resolve({
                        errCode: 0,
                        message: "Comment is deleted"
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: "You don't have permission"
                    })
                }
            } else {
                resolve({
                    errCode: 3,
                    message: "Comment not found!"
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let updateCommentData = (data, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: "Missing required parameters!"
                })
            }
            let comment = await db.Comment.findOne({
                where: { id: data.id },
                raw: false
            });
            if (comment) {
                if (user.role === true || user.id === comment.userID) {
                    comment.content = data.content || comment.content
                    post.img_url = data.img_url || post.img_url
                    post.date = data.date || post.date

                    await course.save();
                    resolve({
                        errCode: 0,
                        message: "Update comment success!"
                    })
                } else {
                    resolve({
                        errCode: 3,
                        message: "You don't have permission"
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    message: 'Comment not found!'
                })
            }
        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    getAllComments: getAllComments,
    createNewComment: createNewComment,
    deleteComment: deleteComment,
    updateCommentData: updateCommentData
}