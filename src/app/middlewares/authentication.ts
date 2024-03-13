/**
 * OAuthミドルウェア
 */
import { cognitoAuth } from '@motionpicture/express-middleware';
import { NextFunction, Request, Response } from 'express';
import { UNAUTHORIZED } from 'http-status';

import { APIError } from '../error/api';

// 許可発行者リスト
const ISSUERS = (<string>process.env.TOKEN_ISSUERS).split(',');
const TOKEN_ISSUER_REQUEST_TIMEOUT: number = 5000;

// tslint:disable-next-line:no-single-line-block-comment
/* istanbul ignore next */
export async function authentication(req: Request, res: Response, next: NextFunction) {
    try {
        await cognitoAuth({
            authorizedHandler: async (user, token) => {
                req.user = user;
                req.accessToken = token;
                next();
            },
            unauthorizedHandler: (err) => {
                next(new APIError(UNAUTHORIZED, [new Error(err.message)]));
            },
            requestOptions: { timeout: TOKEN_ISSUER_REQUEST_TIMEOUT },
            verifyOptions: {
                tokenUse: 'access',
                decodeWithoutVerifying: false,
                issuers: ISSUERS
            }
        })(req, res, next);
    } catch (error) {
        next(new APIError(UNAUTHORIZED, [new Error(error.message)]));
    }
}
