import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export const updatePassword = async (username: string, password: string) =>
    await getRepository(User).update({username}, {password: password});

export const incrementTokenVersion = async (username: string) =>
    await getRepository(User).increment({username}, 'tokenVersion', 1);
