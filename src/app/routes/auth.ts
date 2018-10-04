/**
 * 認証ルーター
 */
import * as mvtk from '@motionpicture/mvtk-reserve-service';
import * as express from 'express';

const authRouter = express.Router();
authRouter.post(
    '/purchaseNumberAuth',
    async (req, res, next) => {
        try {
            const result = await mvtk.services.auth.purchaseNumberAuth.purchaseNumberAuth(req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
);
export default authRouter;
