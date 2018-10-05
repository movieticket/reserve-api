/**
 * 着券ルーター
 */
import * as mvtk from '@motionpicture/mvtk-reserve-service';
import * as express from 'express';

import authentication from '../middlewares/authentication';
import permitScopes from '../middlewares/permitScopes';

const seatRouter = express.Router();
seatRouter.use(authentication);
seatRouter.post(
    '/seatInfoSync',
    permitScopes(['admin']),
    async (req, res, next) => {
        try {
            const result = await mvtk.services.seat.seatInfoSync.seatInfoSync(req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);
export default seatRouter;
