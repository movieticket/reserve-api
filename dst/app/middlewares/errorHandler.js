"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * エラーハンドラーミドルウェア
 */
const createDebug = require("debug");
const http_status_1 = require("http-status");
const api_1 = require("../error/api");
const debug = createDebug('movieticket-reserve-api:middlewares');
exports.default = (err, __, res, next) => {
    debug(err);
    if (res.headersSent) {
        next(err);
        return;
    }
    let apiError;
    if (err instanceof api_1.APIError) {
        apiError = err;
    }
    else if (err.name === 'MvtkReserveServiceError') {
        // mvtk-reserve-serviceのthrowしたエラーであればステータスコード継承
        apiError = new api_1.APIError(err.code, [err]);
    }
    else {
        // 500
        apiError = new api_1.APIError(http_status_1.INTERNAL_SERVER_ERROR, [err]);
    }
    res.status(apiError.code)
        .json({
        error: apiError.toObject()
    });
};
