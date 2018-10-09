/**
 * 404ハンドラーミドルウェア
 */
import { NextFunction, Request, Response } from 'express';
import { NOT_FOUND } from 'http-status';

import { APIError } from '../error/api';

export default (req: Request, _: Response, next: NextFunction) => {
    next(new APIError(NOT_FOUND, [new Error(`router for [${req.originalUrl}]`)]));
};
