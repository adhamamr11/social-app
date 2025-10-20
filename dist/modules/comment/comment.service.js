"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repo_1 = require("../../DB/models/post/post.repo");
const comment_repo_1 = require("../../DB/models/comment/comment.repo");
const error_1 = require("../../utils/error");
const factory_1 = require("./factory");
const rect_provider_1 = require("../../utils/common/providers/rect.provider");
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
        return res.status(201).json({ message: "comment created successfully", success: true, createdComment });
    };
    getSpecific = async (req, res) => {
        const { id } = req.params;
        const comment = await this.commentRepo.exist({ _id: id }, {}, { populate: [{ path: "replies" }] });
        if (!comment)
            throw new error_1.NotFoundException("Comment not found");
        return res.status(200).json({ success: true, comment });
    };
    deleteComment = async (req, res) => {
        const { id } = req.params;
        const commentExist = await this.commentRepo.exist({ _id: id }, {}, {
            populate: [{ path: "postId", select: "userId" }]
        });
        if (!commentExist)
            throw new error_1.NotFoundException("Comment not found");
        if (req.user._id.toString() != commentExist.userId.toString() ||
            req.user._id.toString() != commentExist.postId.userId.toString())
            throw new error_1.UnauthorizedException("You are not authorized to delet this comment");
        await this.commentRepo.update({ _id: id }, { deletedAt: Date.now() });
        return res.status(200).json({ message: "Comment deleted successfully", success: true });
    };
    addReaction = async (req, res) => {
        const { id } = req.params;
        const { reaction } = req.body;
        await (0, rect_provider_1.reactionProvider)(this.commentRepo, id, req.user._id, reaction, req.user);
        return res.sendStatus(204);
    };
    updateComment = async (req, res) => {
        const { id } = req.params;
        const { content } = req.body;
        const commentExist = await this.commentRepo.exist({ _id: id });
        if (!commentExist)
            throw new error_1.NotFoundException("comment not found");
        if (req.user._id.toString() != commentExist.userId.toString())
            throw new error_1.UnauthorizedException("You are not authorized to delete this comment");
        await this.commentRepo.update({ _id: id }, { content });
        return res.status(200).json({ success: true, message: "comment deleted successfully" });
    };
}
exports.default = new CommentService();
