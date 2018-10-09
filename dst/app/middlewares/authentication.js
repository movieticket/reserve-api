"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * OAuthミドルウェア
 * @see https://aws.amazon.com/blogs/mobile/integrating-amazon-cognito-user-pools-with-api-gateway/
 */
const express_middleware_1 = require("@motionpicture/express-middleware");
const http_status_1 = require("http-status");
const api_1 = require("../error/api");
// 許可発行者リスト
const ISSUERS = process.env.TOKEN_ISSUERS.split(',');
// tslint:disable-next-line:no-single-line-block-comment
/* istanbul ignore next */
exports.default = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield express_middleware_1.cognitoAuth({
            issuers: ISSUERS,
            authorizedHandler: (user, token) => __awaiter(this, void 0, void 0, function* () {
                req.user = user;
                req.accessToken = token;
                next();
            }),
            unauthorizedHandler: (err) => {
                next(new api_1.APIError(http_status_1.UNAUTHORIZED, [new Error(err.message)]));
            }
        })(req, res, next);
    }
    catch (error) {
        next(new api_1.APIError(http_status_1.UNAUTHORIZED, [new Error(error.message)]));
    }
});
