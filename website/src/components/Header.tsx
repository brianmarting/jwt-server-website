import jwt from 'jwt-decode';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { clearAccessToken, getAccessToken } from '../auth/Auth';
import '../style/header.scss';

export const Header: React.FC<RouteComponentProps> = ({history}) => {
    const token = jwt(getAccessToken());
    const {username} = token as any;

    return (
        <div className='header d-flex'>
            <div className='mr-auto p-3'>
                Welcome, {username}
            </div>
            <div className='p-3'>
                <button onClick={() => {
                    clearAccessToken();
                    history.push('/login');
                }} className='btn btn-primary'>Logout
                </button>
            </div>
        </div>
    );
};
