"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.VerifyAccShcema = exports.registerShcema = void 0;
const zod_1 = require("zod");
const enum_1 = require("../../utils/common/enum");
exports.registerShcema = zod_1.z.object({
    fullName: zod_1.z.string().min(3).max(30),
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6).max(30),
    phoneNumber: zod_1.z.string().min(11).max(11),
    gender: zod_1.z.enum(enum_1.GENDER),
});
exports.VerifyAccShcema = zod_1.z.object({
    email: zod_1.z.email(),
    otp: zod_1.z.string().length(6)
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6).max(30),
});
