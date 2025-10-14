"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const objectId_valid_1 = require("../../utils/common/validation/objectId.valid");
exports.createPostSchema = zod_1.default.object({
    content: zod_1.default.string(),
    mentions: zod_1.default.array(objectId_valid_1.ObjectIdSchema).optional()
});
