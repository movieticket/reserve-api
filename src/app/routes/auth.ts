/**
 * 認証ルーター
 */
import * as mvtk from '@motionpicture/mvtk-reserve-service';
import { Router } from 'express';

import { permitScopes } from '../middlewares/permitScopes';

const authRouter = Router();
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
export { authRouter };
