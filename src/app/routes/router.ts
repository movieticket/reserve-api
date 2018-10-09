/**
 * ルーター
 */
import * as express from 'express';

import authRouter from './auth';
import healthRouter from './health';
import seatRouter from './seat';

const router = express.Router();

// middleware that is specific to this router
// router.use((req, res, next) => {
//   debug('Time: ', Date.now())
//   next()
// })

router.use('/auth', authRouter);
router.use('/health', healthRouter);
router.use('/seat', seatRouter);

export default router;
