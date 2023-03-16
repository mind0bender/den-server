"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createResponse = ({ msg, err, status, data }) => {
    const response = {
        status, msg
    };
    if (data) {
        response.data = data;
    }
    if (err) {
        response.err = err;
    }
    return response;
};
exports.default = createResponse;
