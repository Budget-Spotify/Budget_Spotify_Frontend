import axios from "axios";

class UserService {
    static async getSongs() {
        return await axios.get('http://localhost:8000/user/list/songs');
    }

    static async getOneSong(songId) {
        return await axios.get('http://localhost:8000/user/song/detail/' + songId);
    }

    static async addSong(data){
        return await axios.post('http://localhost:8000/user/upload/song',data)
    }
    static async editPassword(data){
        return await axios.put('http://localhost:8000/user/editpassword',data);
    }
    static async getInfo(id){
        
       return await axios.get('http://localhost:8000/user/info/'+id)

    }
    static async editInfo(data){
        return await axios.put('http://localhost:8000/user/editinfo',data)
    }
}

export default UserService;