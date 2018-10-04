"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * エラーハンドラーミドルウェア
 */
const createDebug = require("debug");
const http_status_1 = require("http-status");
const api_1 = require("../error/api");
// import logger from '../logger';
const debug = createDebug('movieticket-reserve-api:middlewares');
exports.default = (err, __, res, next) => {
    debug(err);
    // logger.error('movieticket-reserve-api:middleware:errorHandler', err);
    if (res.headersSent) {
        next(err);
        return;
    }
    let apiError;
    if (err instanceof api_1.APIError) {
        apiError = err;
    }
    else {
        // 500
        apiError = new api_1.APIError(http_status_1.INTERNAL_SERVER_ERROR, [new Error(err.message)]);
    }
    res.status(apiError.code).json({
        error: apiError.toObject()
    });
};
