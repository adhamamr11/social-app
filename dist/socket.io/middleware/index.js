"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketAuth = void 0;
const token_1 = require("../../utils/token");
const user_repo_1 = require("../../DB/models/user/user.repo");
const error_1 = require("../../utils/error");
const socketAuth = async (socket, next) => {
    try {
        const { authorization } = socket.handshake.auth;
        const payload = (0, token_1.verifyToken)(authorization);
        const userRepo = new user_repo_1.UserRepo();
        const user = await userRepo.exist({ _id: payload._id });
        if (!user)
            throw new error_1.NotFoundException("User not found");
        socket.data.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.socketAuth = socketAuth;
