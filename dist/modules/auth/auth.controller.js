"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const validation_middleware_1 = require("../../middleware/validation.middleware");
const auth_validation_1 = require("./auth.validation");
const auth_service_1 = __importDefault(require("./auth.service"));
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/register", (0, validation_middleware_1.isValid)(auth_validation_1.registerShcema), auth_service_1.default.register);
exports.authRouter.post("/verify-acc", (0, validation_middleware_1.isValid)(auth_validation_1.VerifyAccShcema), auth_service_1.default.verifyAcc);
exports.authRouter.post("/login", (0, validation_middleware_1.isValid)(auth_validation_1.LoginSchema), auth_service_1.default.login);
