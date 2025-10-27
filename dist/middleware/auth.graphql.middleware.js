"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAuthenticatedGraphQl = void 0;
const token_1 = require("../utils/token");
const dev_env_1 = require("../config/env/dev.env");
const user_repo_1 = require("../DB/models/user/user.repo");
const error_1 = require("../utils/error");
const IsAuthenticatedGraphQl = async (context) => {
    const token = context.accessToken;
    const payload = (0, token_1.verifyToken)(token, dev_env_1.devConfig.SECRET_JWT);
    const userRepo = new user_repo_1.UserRepo();
    const user = await userRepo.exist({ _id: payload._id }, {}, { populate: [{ path: "friends", select: "firstName lastName fullName" }] });
    ;
    if (!user)
        throw new error_1.UnauthorizedException("User not found");
    if (user.credentialUpdatedAt > new Date())
        throw new error_1.BadRequestException("token expired");
    context.user = user;
};
exports.IsAuthenticatedGraphQl = IsAuthenticatedGraphQl;
