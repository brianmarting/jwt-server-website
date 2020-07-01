import React from 'react';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './Header';

export const Home: React.FC<RouteComponentProps> = (props) => {

    // useEffect(d

    return (
        <div>
            <Header {...props}/>
            <Router>
            </Router>
        </div>
    );
};
