import axios from "axios";

class UserService {
    static async getSongs(accessToken) {
        return await axios.get('http://localhost:8000/user/list/songs',{
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
    }

    static async getOneSong(songId, accessToken) {
        return await axios.get('http://localhost:8000/user/song/detail/' + songId,{
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
    }

    static async addSong(data, accessToken) {
        return await axios.post('http://localhost:8000/user/upload/song', data,{
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
    }

    static async editPassword(data, accessToken) {
        return await axios.put('http://localhost:8000/user/editpassword', data,{
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
    }

    static async getInfo(id, accessToken) {

        return await axios.get('http://localhost:8000/user/info/' + id,{
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
    }

    static async editInfo(data, accessToken) {
        return await axios.put('http://localhost:8000/user/editinfo', data)
    }

    static async deleteSong(data, accessToken) {
        return await axios.delete('http://localhost:8000/user/song/delete', {data});
    }
}

export default UserService;