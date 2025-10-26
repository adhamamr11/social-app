"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const message_repo_1 = require("../../DB/models/message/message.repo");
const chat_repo_1 = require("../../DB/models/chat/chat.repo");
const sendMessage = (connectedUsers, socket, io) => {
    return async (data) => {
        const destSocket = connectedUsers.get(data.destId);
        socket.emit("successMessage", data);
        io.to(destSocket).emit("receiveMessage", data);
        const messageRepo = new message_repo_1.MessageRepo();
        const chatRepo = new chat_repo_1.ChatRepo();
        const sender = socket.data.user.id;
        const createdMessage = await messageRepo.create({ content: data.message, sender });
        const chat = await chatRepo.exist({ users: { $all: [sender, data.destId] } });
        if (!chat) {
            await chatRepo.create({ messages: [createdMessage.id], users: [sender, data.destId] });
        }
        else {
            await chatRepo.update({ _id: chat.id }, { $push: { messages: [createdMessage.id] } });
        }
    };
};
exports.sendMessage = sendMessage;
