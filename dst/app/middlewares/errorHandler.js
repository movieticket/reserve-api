"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
/**
 * エラーハンドラーミドルウェア
 */
const createDebug = require("debug");
const http_status_1 = require("http-status");
const api_1 = require("../error/api");
const debug = createDebug('surfrock-reserve-api:middlewares');
function errorHandler(err, __, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.errorHandler = errorHandler;
