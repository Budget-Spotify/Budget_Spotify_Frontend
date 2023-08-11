import axios from "axios";

class SongService {
    static async getPublicSongs() {
        return await axios.get('http://localhost:8000/song/list/songs');
    }
    static async getRandomSong(){
        return await axios.get('http://localhost:8000/song/random')
    }
}

export default SongService;