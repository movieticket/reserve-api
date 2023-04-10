/**
 * Expressアプリケーション
 */
import * as bodyParser from 'body-parser';
import * as express from 'express';
import helmet from 'helmet';
import * as qs from 'qs';

import errorHandler from './middlewares/errorHandler';
import notFoundHandler from './middlewares/notFoundHandler';
import router from './routes/router';

const app = express();
app.set('query parser', (str: any) => qs.parse(str, {
    arrayLimit: 1000,
    parseArrays: true,
    allowDots: false,
    allowPrototypes: true
}));

app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: false,
        directives: {
            defaultSrc: ['\'self\'']
        }
    },
    hsts: {
        maxAge: 5184000, // SIXTY_DAYS_IN_SECONDS
        includeSubDomains: false
    },
    referrerPolicy: { policy: 'no-referrer' }
}));

// api version
// tslint:disable-next-line:no-require-imports no-var-requires
const packageInfo = require('../../package.json');
app.use((__, res, next) => {
    res.setHeader('X-API-Version', <string>packageInfo.version);
    next();
});

// view engine setup
// app.set('views', `${__dirname}/views`);
// app.set('view engine', 'ejs');

app.use(bodyParser.json());
// The extended option allows to choose between parsing the URL-encoded data
// with the querystring library (when false) or the qs library (when true).
app.use(bodyParser.urlencoded({ extended: true }));

// 静的ファイル
// app.use(express.static(__dirname + '/../../public'));

// routers
app.use('/', router);

// 404
app.use(notFoundHandler);

// error handlers
app.use(errorHandler);

export = app;
