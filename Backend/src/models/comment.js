'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Comment.init({
        postID: DataTypes.INTEGER,
        userID: DataTypes.INTEGER,
        content: DataTypes.TEXT,
        img_url: DataTypes.STRING,
        date: DataTypes.DATE,
        timeType: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};