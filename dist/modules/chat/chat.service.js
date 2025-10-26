"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_repo_1 = require("../../DB/models/chat/chat.repo");
const user_repo_1 = require("../../DB/models/user/user.repo");
const error_1 = require("../../utils/error");
class ChatService {
    chatRepo = new chat_repo_1.ChatRepo();
    userRepo = new user_repo_1.UserRepo();
    get = async (req, res) => {
        const user = await this.userRepo.exist({ _id: req.params.userId });
        if (!user)
            throw new error_1.NotFoundException("User not found");
        const chat = await this.chatRepo.find({ users: { $all: [user.id, req.user._id] } }, {}, { populate: [{ path: "messages" }] });
        return res.status(200).json({ success: true, data: { chat } });
    };
}
exports.default = new ChatService();
