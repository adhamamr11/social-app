"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
exports.getPostSchema = zod_1.default.object({ id: zod_1.default.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), { message: " invalid objectId format" }) });
