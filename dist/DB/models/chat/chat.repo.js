"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepo = void 0;
const abstract_repo_1 = require("../../abstract.repo");
const chat_model_1 = require("./chat.model");
class ChatRepo extends abstract_repo_1.AbstractRepo {
    constructor() {
        super(chat_model_1.Chat);
    }
}
exports.ChatRepo = ChatRepo;
