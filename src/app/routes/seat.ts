/**
 * 着券ルーター
 */
import * as mvtk from '@motionpicture/mvtk-reserve-service';
import * as express from 'express';

const seatRouter = express.Router();
seatRouter.post(
    '/seatInfoSync',
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
