import { history } from './history';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';

export const Routes: React.FC = () => (
    <Router history={history}>
        <Switch>
            {/*<Route exact path='/' component={Home}/>*/}
            <Route exact path='/login' component={Login}/>
            <Route exact path='/home' component={Home}/>
        </Switch>
    </Router>
);
