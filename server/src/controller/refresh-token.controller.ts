import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { createAccessToken, sendRefreshToken } from '../token';

export const postRefreshToken = async (req: Request, res: Response) => {
    const token = req.cookies.rt;

    if (!token) {
        return sendInvalidAccessToken(res);
    }

    let payload;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch ({message}) {
        console.error(message);
        return sendInvalidAccessToken(res);
    }

    // valid token
    const user = await getRepository(User).findOne({externalId: payload.id});

    if (!user) {
        return sendInvalidAccessToken(res);
    }

    if (user.tokenVersion !== payload.tokenVersion) {
        return sendInvalidAccessToken(res);
    }

    sendRefreshToken(res, user);

    return res.send({accessToken: createAccessToken(user)});
};

const sendInvalidAccessToken = (res: Response) => res.status(400).send({accessToken: ''});
