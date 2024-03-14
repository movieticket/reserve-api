/**
 * ルーター
 */
import { Router } from 'express';

import { authRouter } from './auth';
import { healthRouter } from './health';
import { seatRouter } from './seat';

import { authentication } from '../middlewares/authentication';

const router = Router();
router.use('/health', healthRouter);
router.use(authentication);
router.use('/auth', authRouter);
router.use('/seat', seatRouter);
export { router };
