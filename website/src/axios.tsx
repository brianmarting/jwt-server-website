import axios, { AxiosRequestConfig } from 'axios';
import { decode } from 'jsonwebtoken';
import { clearAccessToken, getAccessToken, setAccessToken } from './auth/Auth';
import { history } from './history';

export const authApi = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

export const restApi = axios.create({
    baseURL: 'http://localhost:3000'
});

restApi.interceptors.request.use(async (config: AxiosRequestConfig) => {
    const token = getAccessToken();

    if (!token) {
        await fetchAccessToken();
    } else {
        const decodedToken = decode(token, {complete: true}) as any;

        if (decodedToken.payload.exp * 1000 < new Date().getTime()) {
            await fetchAccessToken();
        }
    }

    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
});

const fetchAccessToken = async () => await authApi.post('refresh-token')
    .then(res => {
        const {accessToken} = res.data;
        setAccessToken(accessToken);
    })
    .catch(() => {
        clearAccessToken();
        history.push('/login');
    });
