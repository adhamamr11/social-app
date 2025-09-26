"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_console_1 = require("node:console");
const app_controller_1 = require("./app.controller");
const dotenv_1 = require("dotenv");
const dev_env_1 = require("./config/env/dev.env");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = dev_env_1.devConfig.PORT;
(0, app_controller_1.bootStrap)(app, express_1.default);
app.listen(port, () => (0, node_console_1.log)(`Server running on port ${port}`));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
