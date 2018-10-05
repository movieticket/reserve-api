/**
 * 認証ルーター
 */
import * as mvtk from '@motionpicture/mvtk-reserve-service';
import * as express from 'express';

import authentication from '../middlewares/authentication';
import permitScopes from '../middlewares/permitScopes';

const authRouter = express.Router();
authRouter.use(authentication);
authRouter.post(
    '/purchaseNumberAuth',
    permitScopes(['admin']),
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
