import axios from "axios";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

class SongService {
    static async getAllSongs() {
        return await axios.get(REACT_APP_API_URL + 'song/songs');
    }
    static async createRandomSong(songIDs){
        return await axios.post(REACT_APP_API_URL + 'song/random-songs', songIDs);
    }
    static async searchSong(songName) {
        return await axios.get(REACT_APP_API_URL + `song/songs/search?search=${songName}`);
    }
    static async getAllSingers(){
        return await axios.get(REACT_APP_API_URL + 'song/singers');
    }
    static async getAllComposers(){
        return await axios.get(REACT_APP_API_URL + 'song/composers');
    }
    static async getAllTags(){
        return await axios.get(REACT_APP_API_URL + 'song/tags');
    }
    static async getPlaylist(playlistId){
        return await axios.get(REACT_APP_API_URL + `song/playlists/${playlistId}`);
    }
    static async getAllPlaylistPublic(){
        return await axios.get(REACT_APP_API_URL + 'song/playlists');
    }
}

export default SongService;