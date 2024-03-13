/**
 * ヘルスチェックルーター
 */
import { Router } from 'express';
import { OK } from 'http-status';

const healthRouter = Router();
healthRouter.get(
    '',
    async (_, res, next) => {
        try {
            res.status(OK)
                .send('healthy!');
        } catch (error) {
            next(error);
        }
    }
);
export { healthRouter };
