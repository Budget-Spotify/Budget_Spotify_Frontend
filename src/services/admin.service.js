import {axiosInstance} from "../refreshToken/axios-interceptor";

class AdminService {
    static async getUserList() {
        return await axiosInstance.get('http://localhost:8000/admin/userlist')
    }
}

export default AdminService