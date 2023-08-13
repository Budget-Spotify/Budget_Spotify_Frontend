import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        console.log(accessToken)
        console.log(refreshToken)

        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            const now = Date.now() / 1000;

            if (decodedToken.exp < now) {
                await axios.get("http://localhost:8000/auth/request-refresh-token", {
                    headers: {
                        token: `Bearer ${accessToken}`,
                        refreshToken: refreshToken
                    }
                });
            }
        }

        if (accessToken) {
            config.headers.token = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
