"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepo = void 0;
const abstract_repo_1 = require("../../abstract.repo");
const message_model_1 = require("./message.model");
class MessageRepo extends abstract_repo_1.AbstractRepo {
    constructor() {
        super(message_model_1.Message);
    }
}
exports.MessageRepo = MessageRepo;
