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
 * 認証ルーター
 */
const mvtk = require("@motionpicture/mvtk-reserve-service");
const express = require("express");
const authentication_1 = require("../middlewares/authentication");
const permitScopes_1 = require("../middlewares/permitScopes");
const authRouter = express.Router();
authRouter.use(authentication_1.default);
authRouter.post('/purchaseNumberAuth', (0, permitScopes_1.default)(['admin']), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield mvtk.services.auth.purchaseNumberAuth.purchaseNumberAuth(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = authRouter;
