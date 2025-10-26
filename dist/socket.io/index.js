"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const middleware_1 = require("./middleware");
const chat_1 = require("./chat");
const initSocket = (server) => {
    const connectedUsers = new Map();
    const io = new socket_io_1.Server(server, { cors: { origin: "*", methods: "*" } });
    io.use(middleware_1.socketAuth);
    io.on("connection", async (socket) => {
        connectedUsers.set(socket.data.user.id, socket.id);
        console.log("New user connected:", socket.id);
        console.log(connectedUsers);
        socket.on("sendMessage", (0, chat_1.sendMessage)(connectedUsers, socket, io));
    });
};
exports.initSocket = initSocket;
