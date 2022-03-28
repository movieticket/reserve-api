/**
 * アプリケーション固有の型
 */
import { } from 'express';
declare global {
    namespace Express {
        /**
         * APIユーザー(Cognitから認可を受ける)
         */
        export type IUser = any;
        // tslint:disable-next-line:interface-name
        export interface Request {
            user: IUser;
            accessToken: string;
        }
    }
}
