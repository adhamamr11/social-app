"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.messageSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    sender: { type: mongoose_1.Schema.ObjectId, ref: "User", required: true }
}, { timestamps: true });
