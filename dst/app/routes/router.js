"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/**
 * ルーター
 */
const express_1 = require("express");
const auth_1 = require("./auth");
const health_1 = require("./health");
const seat_1 = require("./seat");
const authentication_1 = require("../middlewares/authentication");
const router = (0, express_1.Router)();
exports.router = router;
router.use('/health', health_1.healthRouter);
router.use(authentication_1.authentication);
router.use('/auth', auth_1.authRouter);
router.use('/seat', seat_1.seatRouter);
