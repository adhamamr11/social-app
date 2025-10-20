"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionProvider = void 0;
const error_1 = require("../../error");
const enum_1 = require("../enum");
const user_repo_1 = require("../../../DB/models/user/user.repo");
const reactionProvider = async (repo, id, userId, reaction, user) => {
    const userRepo = new user_repo_1.UserRepo();
    const postExist = await repo.exist({ _id: id });
    if (!postExist)
        throw new error_1.NotFoundException("Post not found");
    const userExist = await userRepo.exist({ _id: postExist.userId });
    if (userExist.blocks.includes(user._id))
        throw new error_1.BadRequestException("you can't react because you are blocked");
    let userReactionIndex = postExist.reactions.findIndex((reaction) => {
        return reaction.userId.toString() == userId.toString();
    });
    if (userReactionIndex == -1)
        await repo.update({ _id: id }, { $push: { reactions: { reaction: ["", null, undefined].includes(reaction)
                        ? enum_1.REACTION.like
                        : reaction,
                    userId: userId } } });
    else if (["", null, undefined].includes(reaction))
        await repo.update({ _id: id }, { $pull: { reactions: postExist.reactions[userReactionIndex] } });
    else {
        await repo.update({ _id: id, "reactions.userId": userId }, { "reactions.$.reaction": reaction });
    }
};
exports.reactionProvider = reactionProvider;
