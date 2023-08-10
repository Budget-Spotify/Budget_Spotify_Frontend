import axios from "axios";

class AdminService{
    static async getUserList(accessToken){
        return await axios.get('http://localhost:8000/admin/userlist',{
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
    }
}

export default AdminService