"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAuthenticated = void 0;
const token_1 = require("../utils/token");
const dev_env_1 = require("../config/env/dev.env");
const user_repo_1 = require("../DB/models/user/user.repo");
const error_1 = require("../utils/error");
const IsAuthenticated = () => {
    return async (req, res, next) => {
        const token = req.headers.authorization;
        const payload = (0, token_1.verifyToken)(token, dev_env_1.devConfig.SECRET_JWT);
        const userRepo = new user_repo_1.UserRepo();
        const user = await userRepo.exist({ _id: payload._id });
        if (!user)
            throw new error_1.UnauthorizedException("User not found");
        req.user = user;
        next();
    };
};
exports.IsAuthenticated = IsAuthenticated;
