import Cookies from 'js-cookie';
import axiosInstance from './axiosInstance';

const TOKEN_KEY = 'access_token';

export function setToken(token: string) {
  Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true, sameSite: 'strict' });
}

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

export function attachTokenToAxios() {
  axiosInstance.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}