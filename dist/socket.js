"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.denRooms = void 0;
const socket_io_1 = require("socket.io");
const contants_1 = require("./contants");
const logger_1 = __importDefault(require("./util/logger"));
exports.denRooms = new Map();
const initializeSocket = (server) => {
    logger_1.default.info("Initializing Socket server");
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: [contants_1.CLIENT_URL],
        },
    });
    io.on("connection", (socket) => {
        logger_1.default.info(`++ ${socket.id} ${Array.from(io.sockets.sockets).length}`);
        socket.emit("connection");
        socket.on("gather", (denId) => {
            let denRoom = exports.denRooms.get(denId);
            if (!denRoom || !denRoom.memberIds.size) {
                // build the den for first joining;
                denRoom = {
                    kingId: socket.id,
                    memberIds: new Set(),
                };
                exports.denRooms.set(denId, denRoom);
            }
            denRoom === null || denRoom === void 0 ? void 0 : denRoom.memberIds.add(socket.id);
            logger_1.default.info(`${socket.id} gathered in ${denId}`);
            socket.join(denId);
            io.to(denId).emit("members", Array.from(denRoom === null || denRoom === void 0 ? void 0 : denRoom.memberIds));
            socket.on("offer", (offer) => {
                socket.to(denId).emit("offer", offer);
            });
            socket.on("answer", (answer) => {
                socket.to(denId).emit("answer", answer);
            });
            socket.on("candidate", (candidate) => {
                socket.to(denId).emit("candidate", candidate);
            });
            socket.addListener("disconnect", () => {
                denRoom === null || denRoom === void 0 ? void 0 : denRoom.memberIds.delete(socket.id);
            });
        });
        socket.addListener("disconnect", () => {
            logger_1.default.info(`-- ${socket.id} ${Array.from(io.sockets.sockets).length}`);
        });
    });
};
exports.default = initializeSocket;
