"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dev_env_1 = require("../../config/env/dev.env");
const sendMail = async (mailOptions) => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: dev_env_1.devConfig.USER_EMAIL,
            pass: dev_env_1.devConfig.USER_PASS
        }
    });
    mailOptions.from = `Social-App<${dev_env_1.devConfig.USER_EMAIL}>`;
    await transporter.sendMail(mailOptions);
};
exports.sendMail = sendMail;
