"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repo_1 = require("../../DB/models/post/post.repo");
const comment_repo_1 = require("../../DB/models/comment/comment.repo");
const error_1 = require("../../utils/error");
const factory_1 = require("./factory");
class CommentService {
    postRepo = new post_repo_1.PostRepo();
    commentRepo = new comment_repo_1.CommentRepo();
    commentFactory = new factory_1.CommentFactory();
    create = async (req, res) => {
        const { postId, id } = req.params;
        const createCommentDTO = req.body;
        const postExist = await this.postRepo.exist({ _id: postId });
        if (!postExist)
            throw new error_1.NotFoundException("Post not found");
        let commentExist;
        if (id) {
            commentExist = await this.commentRepo.exist({ _id: id });
            if (!commentExist)
                throw new error_1.NotFoundException("Comment not found");
        }
        const comment = this.commentFactory.create(req.user, postExist, createCommentDTO, commentExist);
        const createdComment = await this.commentRepo.create(comment);
        return res.status(200).json({ message: "comment created successfully", success: true, createdComment });
    };
}
exports.default = new CommentService();
