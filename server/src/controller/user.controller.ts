import { compare, hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entity/User';
import { UserMapper } from '../mappers/user.mapper';
import { createAccessToken, sendRefreshToken } from '../token';
import { incrementTokenVersion, updatePassword } from '../util/user.util';

export const getUsers = async (req: Request, res: Response) => {
    const users = await getRepository(User).find();
    return res.send(UserMapper.toDto(users));
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;

        const user = await getRepository(User).findOne({where: {username}});

        if (!user) {
            return res.status(400).send({message: 'Could not find user'});
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
            return res.status(400).send({message: 'Invalid password'});
        }

        sendRefreshToken(res, user);

        return res.send({accessToken: createAccessToken(user)});
    } catch ({message}) {
        console.error(message);
        return res.status(400).send({message: message});
    }
};

export const postUser = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;
        const hashedPassword = await hash(password, 12);

        await getRepository(User).insert({
            externalId: uuidv4(),
            username,
            password: hashedPassword
        });
    } catch ({message}) {
        console.error(message);
        return res.status(400).send({message: message});
    }

    return res.send({message: 'Successfully created user.'});
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;

        const hashedPassword = await hash(password, 12);

        await updatePassword(username, hashedPassword);
        await incrementTokenVersion(username);

        return res.send('ok');
    } catch ({message}) {
        console.error(message);
        return res.status(400).send({message: message});
    }
};
