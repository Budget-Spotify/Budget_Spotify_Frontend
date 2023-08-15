import {axiosInstance} from "../refreshToken/axios-interceptor";

class UserService {
    static async getSongs() {
        return await axiosInstance.get("http://localhost:8000/user/list/songs");
    }

    static async getOneSong(songId) {
        return await axiosInstance.get("http://localhost:8000/user/song/detail/" + songId);
    }

    static async addSong(data) {
        return await axiosInstance.post("http://localhost:8000/user/upload/song", data);
    }

    static async editPassword(data) {
        return await axiosInstance.put("http://localhost:8000/user/editpassword", data);
    }

    static async getInfo(id) {
        return await axiosInstance.get("http://localhost:8000/user/info/" + id);
    }

    static async editInfo(data, accessToken) {
        return await axiosInstance.put("http://localhost:8000/user/editinfo");
    }

    static async deleteSong(data) {
        return await axiosInstance.delete("http://localhost:8000/user/song/delete", {
            data: data,
        });
    }

    static async getPlaylist() {
        return await axiosInstance.get("http://localhost:8000/user/playlist");
    }

    static async getSongInPlaylist(playlistId) {
        return await axiosInstance.get("http://localhost:8000/user/playlist/" + playlistId);
    }

    static async addPlayList(data) {
        return await axiosInstance.post("http://localhost:8000/user/playlist/create", data);
    }

    static async searchSong(playlistName, accessToken) {
        return await axiosInstance.get(`http://localhost:8000/user/search?songName=${playlistName}`);
    }

    static async addSongToPlaylist(playlistId, songId) {
        return await axiosInstance.post(`http://localhost:8000/user/playlist/add-song/` + playlistId, {songId: songId}, {
            data: songId
        });
    }

    static async removeSongFromPlaylist(playlistId, songId) {
        return await axiosInstance.post(`http://localhost:8000/user/playlist/remove-song/` + playlistId, {songId: songId}, {
            data: songId
        });
    }

    static async deletePlaylist(data) {
        return await axiosInstance.delete("http://localhost:8000/user/playlist/delete", {
            data: data,
        });
    }

    static async editPlaylist(data) {
        return await axiosInstance.put("http://localhost:8000/user/playlist/update", data);
    }

    static async updateSongState(data, accessToken) {
        return await axiosInstance.put("http://localhost:8000/user/song/update-state", data);
    }

    static async editSong(data){
        return await axiosInstance.put("http://localhost:8000/user/song/update", data)
    }
}

export default UserService;
