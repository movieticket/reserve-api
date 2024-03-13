/**
 * 404ハンドラーミドルウェア
 */
import type { NextFunction, Request, Response } from 'express';
import { NOT_FOUND } from 'http-status';

import { APIError } from '../error/api';

export function notFoundHandler(req: Request, __: Response, next: NextFunction) {
    next(new APIError(NOT_FOUND, [new Error(`router for [${req.originalUrl}]`)]));
}
