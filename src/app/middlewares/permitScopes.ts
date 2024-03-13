/**
 * スコープ許可ミドルウェア
 */
import * as createDebug from 'debug';
import type { NextFunction, Request, Response } from 'express';
import { UNAUTHORIZED } from 'http-status';

import { } from '../../@types/index';
import { APIError } from '../error/api';

const debug = createDebug('surfrock-reserve-api:middlewares');

/**
 * スコープインターフェース
 */
type IScope = string;

export function permitScopes(permittedScopes: IScope[]) {
    return (req: Request, _: Response, next: NextFunction) => {
        if (process.env.RESOURCE_SERVER_IDENTIFIER === undefined) {
            next(new Error('RESOURCE_SERVER_IDENTIFIER undefined'));

            return;
        }

        debug('req.user.scopes:', req.user.scopes);

        // ドメインつきのカスタムスコープリストを許容するように変更
        const permittedScopesWithResourceServerIdentifier = [
            ...permittedScopes.map((permittedScope) => `${process.env.RESOURCE_SERVER_IDENTIFIER}/${permittedScope}`),
            ...permittedScopes.map((permittedScope) => `${process.env.RESOURCE_SERVER_IDENTIFIER}/auth/${permittedScope}`)
        ];
        // cognitoユーザー管理スコープは単体で特別扱い
        if (permittedScopes.indexOf('aws.cognito.signin.user.admin') >= 0) {
            permittedScopesWithResourceServerIdentifier.push('aws.cognito.signin.user.admin');
        }
        debug('permittedScopesWithResourceServerIdentifier:', permittedScopesWithResourceServerIdentifier);

        // スコープチェック
        try {
            debug('checking scope requirements...', permittedScopesWithResourceServerIdentifier);
            if (!isScopesPermitted(req.user.scopes, permittedScopesWithResourceServerIdentifier)) {
                next(new APIError(UNAUTHORIZED, [new Error('scope requirements not satisfied')]));
            } else {
                next();
            }
        } catch (error) {
            next(error);
        }
    };
}

/**
 * 所有スコープが許可されたスコープかどうか
 * @param ownedScopes 所有スコープリスト
 * @param permittedScopes 許可スコープリスト
 */
function isScopesPermitted(ownedScopes: string[], permittedScopes: string[]) {
    debug('checking scope requirements...', permittedScopes);
    if (!Array.isArray(ownedScopes)) {
        throw new Error('ownedScopes should be array of string');
    }

    const permittedOwnedScope = permittedScopes.find((permittedScope) => ownedScopes.indexOf(permittedScope) >= 0);

    return (permittedOwnedScope !== undefined);
}
