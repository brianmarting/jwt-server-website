import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { userContext } from '../context/userContext';
import { UserUtil } from '../util/user.util';
import { Header } from './Header';

export const Home: React.FC<RouteComponentProps> = (props) => {
    const [user, setUser] = useState();

    useEffect(() => setUser(UserUtil.retrieveUseFromToken()), []);

    return (
        <div>
            <userContext.Provider value={user}>
                <Header {...props}/>
                <Router>
                </Router>
            </userContext.Provider>
        </div>
    );
};
