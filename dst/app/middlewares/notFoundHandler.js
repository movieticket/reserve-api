"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const http_status_1 = require("http-status");
const api_1 = require("../error/api");
function notFoundHandler(req, __, next) {
    next(new api_1.APIError(http_status_1.NOT_FOUND, [new Error(`router for [${req.originalUrl}]`)]));
}
exports.notFoundHandler = notFoundHandler;
