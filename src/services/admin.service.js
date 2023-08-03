import axios from "axios";

class AdminService{
    static async getUserList(){
        return await axios.get('http://localhost:8000/admin/userlist')
    }
}

export default AdminService