"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.devConfig = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASS: process.env.USER_PASS,
    SECRET_JWT: process.env.SECRET_JWT
};
