import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Language } from '../entity/language';
import { LanguageMapper } from '../mappers/language.mapper';

export const postLanguage = async (req: Request, res: Response) => {
    try {
        const {name, summary, description} = req.body;

        await getRepository(Language).insert({
            externalId: uuidv4(),
            name,
            summary,
            description
        });
    } catch ({message}) {
        console.log(message);
        return res.status(400).send({message});
    }

    return res.send({message: 'Successfully added language.'});
};

export const getLanguages = async (req: Request, res: Response) => {
    const languages = await getRepository(Language).find();
    return res.send(LanguageMapper.toDtoListWithoutDescription(languages));
};

export const getLanguage = async (req: Request, res: Response) => {
    const {externalId} = req.params;
    const language = await getRepository(Language).findOne({externalId});

    if (!language) {
        return res.status(404).send({message: 'Resource not found.'});
    }

    return res.send(LanguageMapper.toDto(language));
};

