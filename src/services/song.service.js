import axios from "axios";

class SongService {
    static async getPublicSongs() {
        return await axios.get('http://localhost:8000/song/list/songs');
    }
    static async getRandomSong(){
        return await axios.get('http://localhost:8000/song/random')
    }
    static async searchSongPublic(songname) {
        return await axios.get(`http://localhost:8000/song/search-public?songName=${songname}`);
    }
}

export default SongService;