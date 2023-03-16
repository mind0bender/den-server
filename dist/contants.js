"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_URL = exports.IS_DEV = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
/* eslint-disable node/no-process-env */
(0, dotenv_1.config)();
exports.PORT = process.env.PORT || 8080;
exports.IS_DEV = process.env.NODE_ENV !== "production";
exports.CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
