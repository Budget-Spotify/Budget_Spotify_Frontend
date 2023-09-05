import {axiosInstance} from "../refreshToken/axios-interceptor";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

class AdminService {
    static async getUserList() {
        return await axiosInstance.get(REACT_APP_API_URL + "admin/user-list");
    }

    static async getSingers() {
        return await axiosInstance.get(REACT_APP_API_URL + "admin/singers");
    }

    static async getComposers() {
        return await axiosInstance.get(REACT_APP_API_URL + 'admin/composers');
    }

    static async getTags() {
        return await axiosInstance.get(REACT_APP_API_URL + 'admin/tags');
    }

    static async addSinger(data) {
        return await axiosInstance.post(REACT_APP_API_URL + 'admin/singers', data);
    }

    static async deleteSinger(id) {
        return await axiosInstance.delete(REACT_APP_API_URL + 'admin/singers/' + id);
    }

    static async addComposer(data) {
        return await axiosInstance.post(REACT_APP_API_URL + 'admin/composers', data);
    }

    static async deleteComposer(id) {
        return await axiosInstance.delete(REACT_APP_API_URL + 'admin/composers/' + id);
    }

    static async addTag(data) {
        return await axiosInstance.post(REACT_APP_API_URL + 'admin/tags', data);
    }

    static async deleteTag(id) {
        return await axiosInstance.delete(REACT_APP_API_URL + 'admin/tags/' + id);
    }
}

export default AdminService