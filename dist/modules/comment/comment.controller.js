"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const comment_service_1 = __importDefault(require("./comment.service"));
const commentRouter = (0, express_1.Router)({ mergeParams: true });
commentRouter.post("{/:id}", (0, auth_middleware_1.IsAuthenticated)(), comment_service_1.default.create);
exports.default = commentRouter;
