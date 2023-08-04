import axios from "axios";

class UserService {
    static async getSongs() {
        return await axios.get('http://localhost:8000/user/list/songs');
    }

    static async getOneSong(songId) {
        return await axios.get('http://localhost:8000/user/song/detail/' + songId);
    }
}

export default UserService;