"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repo_1 = require("../../DB/models/post/post.repo");
const factory_1 = require("./factory");
const error_1 = require("../../utils/error");
class PostService {
    postFactory = new factory_1.PostFactory();
    postRepo = new post_repo_1.PostRepo();
    create = async (req, res) => {
        const createPostDTO = req.body;
        const post = this.postFactory.create(createPostDTO, req.user);
        const createdPost = await this.postRepo.create(post);
        return res.status(201).json({ message: "Post created successfully", success: true, data: { createdPost } });
    };
    addReaction = async (req, res) => {
        const { id } = req.params;
        const { reaction } = req.body;
        const postExist = await this.postRepo.exist({ _id: id });
        if (!postExist)
            throw new error_1.NotFoundException("Post not found");
        let userReactionIndex = postExist.reactions.findIndex((reaction) => {
            return reaction.userId.toString() == req.user._id.toString();
        });
        if (userReactionIndex == -1)
            await this.postRepo.update({ _id: id }, { $push: { reactions: { reaction, userId: req.user._id } } });
        else {
            await this.postRepo.update({ _id: id, "reactions.userId": req.user._id }, { "reactions.$.reaction": reaction });
        }
        return res.sendStatus(204);
    };
}
exports.default = new PostService();
