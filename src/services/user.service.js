import axios from "axios";

class UserService {
    static async getSongs() {
        return await axios.get('http://localhost:8000/user/list/songs');
    }
}

export default UserService;