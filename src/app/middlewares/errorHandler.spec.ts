// tslint:disable:no-implicit-dependencies
/**
 * エラーハンドラーミドルウェアテスト
 */
import * as assert from 'assert';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status';
import * as sinon from 'sinon';

import { APIError } from '../error/api';
import { errorHandler } from './errorHandler';

let sandbox: sinon.SinonSandbox;

describe('errorHandler.default()', () => {
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('ヘッダー送信済であればエラーと共にnextが呼ばれるはず', async () => {
        const params = {
            err: new Error('test'),
            req: {},
            res: { headersSent: true },
            next: () => undefined
        };

        sandbox.mock(params)
            .expects('next')
            .once()
            .withExactArgs(sinon.match.instanceOf(Error));

        const result = await errorHandler(params.err, <any>params.req, <any>params.res, params.next);
        assert.equal(result, undefined);
        sandbox.verify();
    });

    it('APIErrorと共に呼ばれればそのままjson出力されるはず', async () => {
        const params = {
            err: new APIError(INTERNAL_SERVER_ERROR, []),
            req: {},
            res: {
                headersSent: false,
                status: () => undefined,
                json: () => undefined
            },
            next: () => undefined
        };

        sandbox.mock(params)
            .expects('next')
            .never();
        sandbox.mock(params.res)
            .expects('status')
            .once()
            .returns(params.res);
        sandbox.mock(params.res)
            .expects('json')
            .once()
            .withExactArgs({ error: params.err.toObject() })
            .returns(params.res);

        const result = await errorHandler(params.err, <any>params.req, <any>params.res, params.next);
        assert.equal(result, undefined);
        sandbox.verify();
    });

    it('MvtkReserveServiceErrorと共に呼ばれればステータスコードを継承するはず', async () => {
        const params = {
            err: { name: 'MvtkReserveServiceError', code: BAD_REQUEST },
            req: {},
            res: {
                headersSent: false,
                status: () => undefined,
                json: () => undefined
            },
            next: () => undefined
        };

        sandbox.mock(params)
            .expects('next')
            .never();
        sandbox.mock(params.res)
            .expects('status')
            .once()
            .withExactArgs(params.err.code)
            .returns(params.res);
        sandbox.mock(params.res)
            .expects('json')
            .once()
            .returns(params.res);

        const result = await errorHandler(params.err, <any>params.req, <any>params.res, params.next);
        assert.equal(result, undefined);
        sandbox.verify();
    });

    it('ハンドリングされていないエラーと共に呼ばれればINTERNAL_SERVER_ERRORとなるはず', async () => {
        const params = {
            err: new Error(),
            req: {},
            res: {
                headersSent: false,
                status: () => undefined,
                json: () => undefined
            },
            next: () => undefined
        };

        sandbox.mock(params)
            .expects('next')
            .never();
        sandbox.mock(params.res)
            .expects('status')
            .once()
            .withExactArgs(INTERNAL_SERVER_ERROR)
            .returns(params.res);
        sandbox.mock(params.res)
            .expects('json')
            .once()
            .returns(params.res);

        const result = await errorHandler(params.err, <any>params.req, <any>params.res, params.next);
        assert.equal(result, undefined);
        sandbox.verify();
    });
});
