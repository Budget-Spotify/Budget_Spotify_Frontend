import axios from "axios";

class UserService {
    static async getSongs() {
        return await axios.get('http://localhost:8000/user/list/songs');
    }
    static async editPassword(data){
        return await axios.put('http://localhost:8000/user/editpassword',data);
    }
}

export default UserService;