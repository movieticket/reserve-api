/**
 * 着券ルーター
 */
import * as mvtk from '@motionpicture/mvtk-reserve-service';
import { Router } from 'express';

import { permitScopes } from '../middlewares/permitScopes';

const seatRouter = Router();
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
export { seatRouter };
