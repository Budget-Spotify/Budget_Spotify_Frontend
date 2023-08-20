import {axiosInstance} from "../refreshToken/axios-interceptor";

class AdminService {
    static async getUserList() {
        return await axiosInstance.get('http://localhost:8000/admin/userlist')
    }
    static async getSingers(){
        return await axiosInstance.get('http://localhost:8000/admin/singers')
    }
    static async getComposers(){
        return await axiosInstance.get('http://localhost:8000/admin/composers')
    }
    static async getTags(){
        return await axiosInstance.get('http://localhost:8000/admin/tags')
    }
    static async addSinger(){
        return await axiosInstance.post('http://localhost:8000/admin/addsinger')
    }
    static async deleteSinger(id){
        return await axiosInstance.delete('http://localhost:8000/admin/deletesinger/'+id)
    }
}

export default AdminService