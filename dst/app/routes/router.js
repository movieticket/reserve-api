"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ルーター
 */
const express = require("express");
const auth_1 = require("./auth");
const health_1 = require("./health");
const seat_1 = require("./seat");
const router = express.Router();
// middleware that is specific to this router
// router.use((req, res, next) => {
//   debug('Time: ', Date.now())
//   next()
// })
router.use('/auth', auth_1.default);
router.use('/health', health_1.default);
router.use('/seat', seat_1.default);
exports.default = router;
