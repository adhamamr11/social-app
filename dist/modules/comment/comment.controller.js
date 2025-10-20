"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const comment_service_1 = __importDefault(require("./comment.service"));
const validation_middleware_1 = require("../../middleware/validation.middleware");
const comment_validation_1 = require("./comment.validation");
const commentRouter = (0, express_1.Router)({ mergeParams: true });
commentRouter.post("{/:id}", (0, auth_middleware_1.IsAuthenticated)(), (0, validation_middleware_1.isValid)(comment_validation_1.createCommentSchema), comment_service_1.default.create);
commentRouter.get("/:id", (0, auth_middleware_1.IsAuthenticated)(), comment_service_1.default.getSpecific);
commentRouter.delete("/:id", (0, auth_middleware_1.IsAuthenticated)(), comment_service_1.default.deleteComment);
commentRouter.patch("/:id", (0, auth_middleware_1.IsAuthenticated)(), comment_service_1.default.addReaction);
commentRouter.patch("/:id/update", (0, auth_middleware_1.IsAuthenticated)(), comment_service_1.default.updateComment);
exports.default = commentRouter;
