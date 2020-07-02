import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { setAccessToken } from '../auth/Auth';
import { authApi } from '../axios';
import '../style/home.scss';

export const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (event: any) => {
        event.preventDefault();
        await authApi.post('http://localhost:3000/user/login', {
            username,
            password
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(res.statusText);
                }

                const {accessToken} = res.data;
                setAccessToken(accessToken);
                history.push('/home');
            }).catch(console.log);
    };

    return (
        <div className='login-container'>
            <h1 className='mb-3'>Hello!</h1>
            <form onSubmit={submit}>
                <div className='row form-group'>
                    <input
                        className='form-control'
                        type='text'
                        value={username}
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className='row form-group'>
                    <input
                        className='form-control'
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Login</button>
            </form>
        </div>
    );
};
