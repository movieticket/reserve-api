/**
 * エラーハンドラーミドルウェア
 */
import * as createDebug from 'debug';
import type { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status';

import { APIError } from '../error/api';

const debug = createDebug('surfrock-reserve-api:middlewares');

export async function errorHandler(err: any, __: Request, res: Response, next: NextFunction) {
    debug(err);
    if (res.headersSent) {
        next(err);

        return;
    }

    let apiError: APIError;
    if (err instanceof APIError) {
        apiError = err;
    } else if (err.name === 'MvtkReserveServiceError') {
        // mvtk-reserve-serviceのthrowしたエラーであればステータスコード継承
        apiError = new APIError(err.code, [err]);
    } else {
        // 500
        apiError = new APIError(INTERNAL_SERVER_ERROR, [err]);
    }

    res.status(apiError.code)
        .json({
            error: apiError.toObject()
        });
}
