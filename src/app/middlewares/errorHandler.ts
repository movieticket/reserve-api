/**
 * エラーハンドラーミドルウェア
 */
import * as createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status';

import { APIError } from '../error/api';
// import logger from '../logger';

const debug = createDebug('movieticket-reserve-api:middlewares');

export default (err: any, __: Request, res: Response, next: NextFunction) => {
    debug(err);
    // logger.error('movieticket-reserve-api:middleware:errorHandler', err);

    if (res.headersSent) {
        next(err);

        return;
    }

    let apiError: APIError;
    if (err instanceof APIError) {
        apiError = err;
    } else {
        // 500
        apiError = new APIError(INTERNAL_SERVER_ERROR, [new Error(err.message)]);
    }

    res.status(apiError.code).json({
        error: apiError.toObject()
    });
};
