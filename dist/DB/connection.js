"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = connectToDB;
const mongoose_1 = __importDefault(require("mongoose"));
const dev_env_1 = require("../config/env/dev.env");
async function connectToDB() {
    await mongoose_1.default.connect(dev_env_1.devConfig.DB_URL)
        .then(() => console.log("Connected to DB successfully"))
        .catch((e) => console.log("Failed to connect to DB", e));
}
