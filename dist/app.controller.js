"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootStrap = bootStrap;
const connection_1 = require("./DB/connection");
const auth_controller_1 = require("./modules/auth/auth.controller");
const post_controller_1 = __importDefault(require("./modules/post/post.controller"));
const comment_controller_1 = __importDefault(require("./modules/comment/comment.controller"));
const user_controller_1 = __importDefault(require("./modules/user/user.controller"));
const cors_1 = __importDefault(require("cors"));
const express_1 = require("graphql-http/lib/use/express");
const chat_controller_1 = __importDefault(require("./modules/chat/chat.controller"));
const app_schema_1 = require("./app.schema");
function bootStrap(app, express) {
    app.use(express.json());
    (0, connection_1.connectToDB)();
    app.use((0, cors_1.default)({ origin: "*" }));
    app.use("/auth", auth_controller_1.authRouter);
    app.use("/post", post_controller_1.default);
    app.use("/comment", comment_controller_1.default);
    app.use("/user", user_controller_1.default);
    app.use("/chat", chat_controller_1.default);
    app.use("/graphql", (0, express_1.createHandler)({ schema: app_schema_1.appSchema,
        formatError: (error) => {
            return {
                message: error.message,
                success: false,
                path: error.path,
                detials: error.originalError
            };
        }, context: (req) => {
            const accessToken = req.headers["authorization"];
            return {
                accessToken
            };
        } }));
    app.use("/{*dummy}", (req, res, next) => {
        return res.status(404).json({ message: "Not Found", success: false });
    });
    app.use((err, req, res, next) => {
        return res.status(err.statusCode || 500).json({ message: err.message, success: false, errorDetails: err.errorDetails, stack: err.stack });
    });
}
