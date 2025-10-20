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
function bootStrap(app, express) {
    app.use(express.json());
    (0, connection_1.connectToDB)();
    app.use("/auth", auth_controller_1.authRouter);
    app.use("/post", post_controller_1.default);
    app.use("/comment", comment_controller_1.default);
    app.use("/user", user_controller_1.default);
    app.use("/{*dummy}", (req, res, next) => {
        return res.status(404).json({ message: "Not Found", success: false });
    });
    app.use((err, req, res, next) => {
        return res.status(err.statusCode || 500).json({ message: err.message, success: false, errorDetails: err.errorDetails, stack: err.stack });
    });
}
