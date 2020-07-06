import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import { userContext } from '../context/userContext';
import { UserUtil } from '../util/user.util';
import { Header } from './Header';
import { LanguageDetails } from './LanguageDetails';
import { LanguageList } from './LanguageList';

export const Home: React.FC<RouteComponentProps> = (props) => {
    const [user, setUser] = useState();

    useEffect(() => setUser(UserUtil.retrieveUseFromToken()), []);

    return (
        <userContext.Provider value={user}>
            <Header {...props}/>
            <Route exact path={props.match.path} render={() => <LanguageList {...props} />}/>
            <Route exact path={`${props.match.path}details/:id`} render={({match}) => (
                <LanguageDetails languageId={match.params.id}/>
            )}/>
        </userContext.Provider>
    );
};
