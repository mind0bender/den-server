"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contants_1 = require("./contants");
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./util/logger"));
const http_1 = require("http");
const socket_1 = __importDefault(require("./socket"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const server = (0, http_1.createServer)(app_1.default);
(0, socket_1.default)(server);
if (require.main === module) {
    // Start the server only if this file is being run directly
    server.listen(contants_1.PORT, () => {
        logger_1.default.info(`server running on port ${contants_1.PORT}`);
    });
}
exports.default = server;
