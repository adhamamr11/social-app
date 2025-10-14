"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repo_1 = require("../../DB/models/post/post.repo");
const factory_1 = require("./factory");
const error_1 = require("../../utils/error");
const rect_provider_1 = require("../../utils/common/providers/rect.provider");
class PostService {
    postFactory = new factory_1.PostFactory();
    postRepo = new post_repo_1.PostRepo();
    create = async (req, res) => {
        const createPostDTO = req.body;
        const post = await this.postFactory.create(createPostDTO, req.user);
        const createdPost = await this.postRepo.create(post);
        return res.status(201).json({ message: "Post created successfully", success: true, data: { createdPost } });
    };
    addReaction = async (req, res) => {
        const { id } = req.params;
        const { reaction } = req.body;
        await (0, rect_provider_1.reactionProvider)(this.postRepo, id, req.user._id, reaction);
        return res.sendStatus(204);
    };
    getSpecific = async (req, res) => {
        const { id } = req.params;
        const postExist = await this.postRepo.exist({ _id: id }, {}, { populate: [{ path: "userId", select: "fullName firstName lastName" },
                { path: "reactions.userId", select: "fullName firstName lastName" },
                { path: "comments", match: { parentId: null } }] });
        if (!postExist)
            throw new error_1.NotFoundException("Post not found");
        return res.status(200).json({ success: true, post: { postExist } });
    };
    deletePost = async (req, res) => {
        const { id } = req.params;
        const postExist = await this.postRepo.exist({ _id: id });
        if (!postExist)
            throw new error_1.NotFoundException("Post not found");
        if (req.user._id.toString() != postExist.userId.toString())
            throw new error_1.UnauthorizedException("You are not authorized to delete this post");
        await this.postRepo.delete({ _id: id });
        return res.status(200).json({ success: true, message: "Post deleted successfully" });
    };
}
exports.default = new PostService();
