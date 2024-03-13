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
/**
 * OAuthミドルウェア
 */
const express_middleware_1 = require("@motionpicture/express-middleware");
const http_status_1 = require("http-status");
const api_1 = require("../error/api");
// 許可発行者リスト
const ISSUERS = process.env.TOKEN_ISSUERS.split(',');
const TOKEN_ISSUER_REQUEST_TIMEOUT = 5000;
// tslint:disable-next-line:no-single-line-block-comment
/* istanbul ignore next */
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, express_middleware_1.cognitoAuth)({
            authorizedHandler: (user, token) => __awaiter(void 0, void 0, void 0, function* () {
                req.user = user;
                req.accessToken = token;
                next();
            }),
            unauthorizedHandler: (err) => {
                next(new api_1.APIError(http_status_1.UNAUTHORIZED, [new Error(err.message)]));
            },
            requestOptions: { timeout: TOKEN_ISSUER_REQUEST_TIMEOUT },
            verifyOptions: {
                tokenUse: 'access',
                decodeWithoutVerifying: false,
                issuers: ISSUERS
            }
        })(req, res, next);
    }
    catch (error) {
        next(new api_1.APIError(http_status_1.UNAUTHORIZED, [new Error(error.message)]));
    }
});
