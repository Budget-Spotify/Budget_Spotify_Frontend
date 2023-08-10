import axios from "axios";

class SongService {
    static async getPublicSongs() {
        return await axios.get('http://localhost:8000/song/list/songs');
    }
}

export default SongService;