"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repo_1 = require("../../DB/models/post/post.repo");
const factory_1 = require("./factory");
const error_1 = require("../../utils/error");
const enum_1 = require("../../utils/common/enum");
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
            await this.postRepo.update({ _id: id }, { $push: { reactions: { reaction: ["", null, undefined].includes(reaction)
                            ? enum_1.REACTION.like
                            : reaction,
                        userId: req.user._id } } });
        else if (["", null, undefined].includes(reaction))
            await this.postRepo.update({ _id: id }, { $pull: { reactions: postExist.reactions[userReactionIndex] } });
        else {
            await this.postRepo.update({ _id: id, "reactions.userId": req.user._id }, { "reactions.$.reaction": reaction });
        }
        return res.sendStatus(204);
    };
    getSpecific = async (req, res) => {
        const { id } = req.params;
        const postExist = await this.postRepo.exist({ _id: id }, {}, { populate: [{ path: "userId", select: "fullName firstName lastName" },
                { path: "reactions.userId", select: "fullName firstName lastName" },
                { path: "comments", match: { parentIds: [] } }] });
        if (!postExist)
            throw new error_1.NotFoundException("Post not found");
        return res.status(200).json({ success: true, post: { postExist } });
    };
}
exports.default = new PostService();
