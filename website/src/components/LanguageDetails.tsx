import React, { useEffect, useState } from 'react';
import { restApi } from '../axios';
import { LanguageModel } from '../model/language.model';
import '../style/language-details.scss';
import { Loading } from './Loading';

interface Props {
    languageId: string;
}

export const LanguageDetails: React.FC<Props> = ({languageId}) => {

    const [language, setLanguage] = useState<LanguageModel>();

    useEffect(() => {
        restApi.get(`language/${languageId}`).then(res => setLanguage(res.data));
    }, []);

    if (!language) {
        return <Loading/>;
    }

    return (
        <div className='language-details my-3 flex-column bd-highlight text-left'>
            <h2>{language.name}</h2>
            <img src={require(`../images/${language.name}.png`)}/>
            <div>
                <div className='summary'>{language.summary}</div>
                <div className='description'>{language.description}</div>
            </div>
        </div>
    );
};
