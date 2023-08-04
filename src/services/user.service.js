import axios from "axios";

class UserService {
    static async getSongs() {
        return await axios.get('http://localhost:8000/user/list/songs');
    }

    static async getOneSong(songId) {
        return await axios.get('http://localhost:8000/user/song/detail/' + songId);
    }
    static async editPassword(data){
        return await axios.put('http://localhost:8000/user/editpassword',data);
    }
    static async getInfo(id){
        
       return await axios.get('http://localhost:8000/user/info/'+id)

    }
}

export default UserService;