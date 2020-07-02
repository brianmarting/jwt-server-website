import jwt from 'jwt-decode';
import React from 'react';
import { getAccessToken } from '../auth/Auth';

export class UserUtil {

    static retrieveUseFromToken(): string {
        const accessToken = getAccessToken();

        if (!accessToken) {
            return '';
        }

        const jwtToken = jwt(accessToken) as any;

        return jwtToken.username;
    }
}
