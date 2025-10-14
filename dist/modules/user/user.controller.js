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
userRouter.put("/update-info", (0, auth_middleware_1.IsAuthenticated)(), (0, validation_middleware_1.isValid)(user_validation_1.updateInfoSchema), user_service_1.default.updateInfo);
exports.default = userRouter;
