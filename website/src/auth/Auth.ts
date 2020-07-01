export const getAccessToken = (): string => localStorage.getItem('accessToken') || '';
export const setAccessToken = (token: string) => localStorage.setItem('accessToken', token || '');
export const clearAccessToken = () => localStorage.removeItem('accessToken');
