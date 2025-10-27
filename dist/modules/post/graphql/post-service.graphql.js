"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.getSpecificPost = void 0;
const post_repo_1 = require("../../../DB/models/post/post.repo");
const auth_graphql_middleware_1 = require("../../../middleware/auth.graphql.middleware");
const validation_graphql_middleware_1 = require("../../../middleware/validation.graphql.middleware");
const error_1 = require("../../../utils/error");
const post_validation_1 = require("./post-validation");
const getSpecificPost = async (parent, args, context) => {
    await (0, auth_graphql_middleware_1.IsAuthenticatedGraphQl)(context);
    (0, validation_graphql_middleware_1.isValidGraphQl)(post_validation_1.getPostSchema, args);
    const postRepo = new post_repo_1.PostRepo();
    const post = await postRepo.exist({ _id: args.id }, {}, { populate: [{ path: "userId", select: "fullName email" }] });
    if (!post)
        throw new error_1.NotFoundException("Post not found");
    return {
        message: "Done",
        success: true,
        data: post
    };
};
exports.getSpecificPost = getSpecificPost;
const getPosts = async (parent, args) => {
    const postRepo = new post_repo_1.PostRepo();
    const posts = await postRepo.findAll({}, {}, { populate: [{ path: "userId", select: "fullName email" }] });
    if (!posts)
        throw new error_1.NotFoundException("Post not found");
    return {
        message: "Done",
        success: true,
        data: posts
    };
};
exports.getPosts = getPosts;
