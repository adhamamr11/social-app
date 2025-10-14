"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFactory = void 0;
const entity_1 = require("../entity");
const error_1 = require("../../../utils/error");
const email_1 = require("../../../utils/email");
const user_repo_1 = require("../../../DB/models/user/user.repo");
class PostFactory {
    async create(createPostDTO, user) {
        const post = new entity_1.PostEntity();
        const repo = new user_repo_1.UserRepo();
        post.userId = user._id,
            post.content = createPostDTO.content,
            post.reactions = [];
        let validMentionUsers = [];
        if (createPostDTO.mentions.length) {
            for (const userId of createPostDTO.mentions) {
                const userExist = await repo.find({ _id: userId });
                if (!userExist)
                    throw new error_1.NotFoundException("user not found");
                validMentionUsers.push(userExist._id.toString());
                (0, email_1.sendMail)({ to: userExist.email, from: user.email, html: `<h1> ${user.fullName} mention you in a post</h1>` });
            }
        }
        post.mentions = validMentionUsers;
        return post;
    }
}
exports.PostFactory = PostFactory;
