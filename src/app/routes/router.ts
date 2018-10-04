/**
 * ルーター
 */
import * as express from 'express';

import healthRouter from './health';

const router = express.Router();

// middleware that is specific to this router
// router.use((req, res, next) => {
//   debug('Time: ', Date.now())
//   next()
// })

router.use('/health', healthRouter);

export default router;
