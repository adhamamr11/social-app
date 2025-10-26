"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const user_service_1 = __importDefault(require("./user.service"));
const validation_middleware_1 = require("../../middleware/validation.middleware");
const user_validation_1 = require("./user.validation");
const userRouter = (0, express_1.Router)();
userRouter.get("/profile", (0, auth_middleware_1.IsAuthenticated)(), user_service_1.default.getProfile);
userRouter.put("/update-info", (0, auth_middleware_1.IsAuthenticated)(), (0, validation_middleware_1.isValid)(user_validation_1.updateInfoSchema), user_service_1.default.updateInfo);
userRouter.post("/friend-ship-request", (0, auth_middleware_1.IsAuthenticated)(), user_service_1.default.friendShipRequest);
userRouter.get("/list-friend-requests", (0, auth_middleware_1.IsAuthenticated)(), user_service_1.default.listFriendRequests);
userRouter.patch("/response-friend-request", (0, auth_middleware_1.IsAuthenticated)(), user_service_1.default.responseToFriendRequest);
userRouter.patch("/block/:id", (0, auth_middleware_1.IsAuthenticated)(), user_service_1.default.blockUser);
exports.default = userRouter;
