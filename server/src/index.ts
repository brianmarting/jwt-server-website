import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createConnection } from 'typeorm';
import { getUsers, loginUser, postRefreshToken, postUser, resetPassword } from './controller';
import { getLanguage, getLanguages, postLanguage } from './controller/language.controller';
import { isAuth } from './middleware/auth';

(async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(cors({credentials: true, origin: 'http://localhost:4000'}));

    // no auth needed
    app.post('/user/login', loginUser);
    app.post('/user/register', postUser);
    app.post('/user/reset-password', resetPassword);
    app.post('/refresh-token', postRefreshToken);

    // auth routes
    app.get('/user', isAuth, getUsers);
    app.get('/language', isAuth, getLanguages);
    app.get('/language/:externalId', isAuth, getLanguage);
    app.post('/language', isAuth, postLanguage);

    await createConnection();

    app.listen(3000, () => {
        console.log('Express server started');
    });
})();
