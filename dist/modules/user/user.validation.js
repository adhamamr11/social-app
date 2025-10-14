"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInfoSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.updateInfoSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(3).max(30).optional(),
    lastName: zod_1.default.string().min(3).max(30).optional(),
    phoneNumber: zod_1.default.string().min(11).max(11).optional(),
});
