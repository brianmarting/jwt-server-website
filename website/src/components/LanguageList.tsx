import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { restApi } from '../axios';
import { LanguageModel } from '../model/language.model';
import { Language } from './Language';
import { Loading } from './Loading';

export const LanguageList: React.FC<RouteComponentProps> = (props) => {

    const [languages, setLanguages] = useState<LanguageModel[]>();

    useEffect(() => {
        restApi.get('language').then(res => setLanguages(res.data));
    }, []);

    if (!languages) {
        return <Loading/>;
    }

    return (
        <div className='row m-5'>
            {languages.map(language => <Language key={language.id} history={props.history} language={language}/>)}
        </div>
    );
};
