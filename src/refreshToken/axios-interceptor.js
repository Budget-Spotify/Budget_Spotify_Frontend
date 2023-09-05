import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {AuthService} from "../services/auth.service";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    async (config) => {
        let accessToken = localStorage.getItem('token');
        let refreshToken = localStorage.getItem('refreshToken');

        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            const now = Date.now() / 1000;

            if (decodedToken.exp < now) {
                const tokens = await AuthService.reqRefreshToken(accessToken, refreshToken);
                await localStorage.setItem("token", tokens.data.accessToken);
                await localStorage.setItem("refreshToken", tokens.data.refreshToken);
            }
        }

        accessToken = localStorage.getItem('token');

        if (accessToken) {
            config.headers.token = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
