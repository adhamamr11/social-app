"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentFactory = void 0;
const entity_1 = require("../entity");
class CommentFactory {
    create(user, post, createCommentDTO, comment) {
        const newComment = new entity_1.Comment();
        newComment.userId = user._id;
        newComment.postId = post._id;
        newComment.reactions = [],
            newComment.content = createCommentDTO.content,
            newComment.parentIds = comment ? [...comment.parentIds, comment._id] : [];
        return newComment;
    }
}
exports.CommentFactory = CommentFactory;
