"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFactory = void 0;
const entity_1 = require("../entity");
class PostFactory {
    create(createPostDTO, user) {
        const post = new entity_1.PostEntity();
        post.userId = user._id,
            post.content = createPostDTO.content,
            post.reactions = [];
        return post;
    }
}
exports.PostFactory = PostFactory;
