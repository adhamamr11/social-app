"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const post_service_1 = __importDefault(require("./post.service"));
const validation_middleware_1 = require("../../middleware/validation.middleware");
const post_validation_1 = require("./post.validation");
const comment_controller_1 = __importDefault(require("../comment/comment.controller"));
const postRouter = (0, express_1.Router)();
postRouter.post("/", (0, validation_middleware_1.isValid)(post_validation_1.createPostSchema), (0, auth_middleware_1.IsAuthenticated)(), post_service_1.default.create);
postRouter.patch("/:id", (0, auth_middleware_1.IsAuthenticated)(), post_service_1.default.addReaction);
postRouter.get("/:id", (0, auth_middleware_1.IsAuthenticated)(), post_service_1.default.getSpecific);
postRouter.use("/:postId/comment", comment_controller_1.default);
exports.default = postRouter;
