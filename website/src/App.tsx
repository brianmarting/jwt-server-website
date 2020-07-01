import React from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import { getAccessToken } from './auth/Auth';
import { Routes } from './Routes';

export const App = () => {
    const history = useHistory();

    if (!getAccessToken()) {
        history.push('/login');
    } else {
        history.push('/home');
    }

    return (
        <div className="App">
            <Routes/>
        </div>
    );
};
