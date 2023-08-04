import axios from "axios";

class UserService {
    static async getSongs() {
        return await axios.get('http://localhost:8000/user/list/songs');
    }
    static async addSong(data){
        return await axios.post('http://localhost:8000/user/upload/song',data)
    }
}

export default UserService;