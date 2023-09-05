import axios from "axios";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export class AuthService {
    static async jwtLogin(values) {
        return await axios.post(REACT_APP_API_URL + "auth/login", values);
    }

    static async googleLogin(values) {
        return await axios.post(REACT_APP_API_URL + "auth/google-login", {token: values});
    }

    static async reqRefreshToken(accessToken, refreshToken) {
        return await axios.post(REACT_APP_API_URL + "auth/refresh-token", {
            headers: {
                token: `Bearer ${accessToken}`,
                refreshToken: refreshToken
            }
        });
    }

    static async register(data) {
        return await axios.post(REACT_APP_API_URL + "auth/register", data)
    }
}