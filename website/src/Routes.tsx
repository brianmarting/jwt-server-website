import React from 'react';
import { Route, Router, Switch, useHistory } from 'react-router-dom';
import { getAccessToken } from './auth/Auth';
import { Home } from './components/Home';
import { Login } from './components/Login';

export const Routes: React.FC = () => {
    const history = useHistory();

    if (!getAccessToken()) {
        history.push('/login');
    }

    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/login' component={Login}/>
                <Route path='/' component={Home}/>
            </Switch>
        </Router>
    );
};
