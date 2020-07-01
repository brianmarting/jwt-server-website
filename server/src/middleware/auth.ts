import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'];

    if (!authorization)  {
        return res.status(401).send({message: 'Unauthorized'});
    }

    try {
        const token = authorization.split(' ')[1];
        verify(token, process.env.ACCESS_TOKEN_SECRET!);
    } catch ({message}) {
        console.log(message);
        return res.status(403).send({message: 'Your jwt token has expired'});
    }

    return next();
};
