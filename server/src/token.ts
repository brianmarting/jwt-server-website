import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { User } from './entity/user';

export const createAccessToken = (user: User) =>
    sign({id: user.externalId, username: user.username}, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: process.env.ACCESS_TOKEN_DURATION});

const createRefreshToken = (user: User) =>
    sign({id: user.externalId, tokenVersion: user.tokenVersion}, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: process.env.REFRESH_TOKEN_DURATION});

export const sendRefreshToken = (res: Response, user: User) => {
    const token = createRefreshToken(user);
    res.cookie(
        'rt',
        token,
        {
            httpOnly: false,
            path: '/'
        }
    );
};
