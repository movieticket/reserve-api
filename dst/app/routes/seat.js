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
 * 着券ルーター
 */
const mvtk = require("@motionpicture/mvtk-reserve-service");
const express = require("express");
const authentication_1 = require("../middlewares/authentication");
const permitScopes_1 = require("../middlewares/permitScopes");
const seatRouter = express.Router();
seatRouter.use(authentication_1.default);
seatRouter.post('/seatInfoSync', permitScopes_1.default(['admin']), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const result = yield mvtk.services.seat.seatInfoSync.seatInfoSync(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = seatRouter;
