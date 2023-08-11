import axios from "axios";

class UserService {
    static async getSongs(accessToken) {
        return await axios.get("http://localhost:8000/user/list/songs", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
    }

    static async getOneSong(songId, accessToken) {
        return await axios.get("http://localhost:8000/user/song/detail/" + songId, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
    }

    static async addSong(data, accessToken) {
        return await axios.post("http://localhost:8000/user/upload/song", data, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
    }

    static async editPassword(data, accessToken) {
        return await axios.put("http://localhost:8000/user/editpassword", data, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
    }

    static async getInfo(id, accessToken) {
        return await axios.get("http://localhost:8000/user/info/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
    }

    static async editInfo(data, accessToken) {
        return await axios.put("http://localhost:8000/user/editinfo", data, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
    }

    static async deleteSong(data, accessToken) {
        return await axios.delete("http://localhost:8000/user/song/delete", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
            data: data,
        });
    }

    static async getPlaylist(accessToken) {
        return await axios.get("http://localhost:8000/user/playlist", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
    }

    static async getSongInPlaylist(playlistId, accessToken) {
        return await axios.get("http://localhost:8000/user/playlist/" + playlistId, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
    }

    static async addPlayList(data, accessToken) {
        return await axios.post("http://localhost:8000/user/playlist/create", data, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
    }

    static async searchSong(playlistName, accessToken) {
        return await axios.get(`http://localhost:8000/user/search?songName=${playlistName}`, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
    }

    static async addSongToPlaylist(playlistId, songId, accessToken) {
        return await axios.post(`http://localhost:8000/user/playlist/add-song/` + playlistId, { songId: songId },{
            headers: {
                token: `Bearer ${accessToken}`,
            }, data: songId
        });
    }

    static async removeSongFromPlaylist(playlistId, songId, accessToken) {
        return await axios.post(`http://localhost:8000/user/playlist/remove-song/` + playlistId, { songId: songId },{
            headers: {
                token: `Bearer ${accessToken}`,
            }, data: songId
        });
    }
    static async deletePlaylist(data, accessToken) {
        return await axios.delete("http://localhost:8000/user/playlist/delete", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
            data: data,
        });
    }
    static async editPlaylist(data, accessToken) {
        return await axios.put("http://localhost:8000/user/playlist/update", data, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
    }
    static async updateSongState(data, accessToken) {
        return await axios.put("http://localhost:8000/user/song/update-state", data, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
    }
}

export default UserService;
