"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectIdSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
exports.ObjectIdSchema = zod_1.default.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), { message: " invalid objectId format" });
