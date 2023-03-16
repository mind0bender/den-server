"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contants_1 = require("../contants");
const logger_1 = __importDefault(require("./logger"));
const response_1 = __importDefault(require("./response"));
const errorHandler = (err, _req, res, _next) => {
    logger_1.default.err(err);
    res.status(500).send((0, response_1.default)({
        msg: "There was some error",
        status: false,
        err: contants_1.IS_DEV
            ? {
                msg: err.message,
                stack: err.stack,
            }
            : null,
    }));
};
exports.default = errorHandler;
