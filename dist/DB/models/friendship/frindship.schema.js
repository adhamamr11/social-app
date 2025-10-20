"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendShipSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../utils/common/enum");
exports.friendShipSchema = new mongoose_1.Schema({
    requestFrom: { type: mongoose_1.Schema.ObjectId, ref: "User" },
    requestTo: { type: mongoose_1.Schema.ObjectId, ref: "User" },
    status: { type: Number, enum: enum_1.STATUS, default: enum_1.STATUS.PENDING }
}, { timestamps: true });
