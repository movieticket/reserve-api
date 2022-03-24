/**
 * ヘルスチェックルーター
 */
import * as express from 'express';
import { OK } from 'http-status';

const healthRouter = express.Router();
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
export default healthRouter;
