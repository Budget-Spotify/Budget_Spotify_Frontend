import axios from "axios";

class AdminService{
    static async getUserList(accessToken,userRole){
        return await axios.get('http://localhost:8000/admin/userlist',{
            headers:{ Authorization: `Bearer ${accessToken}`, 
            Role: userRole 
        }})
    }
}

export default AdminService