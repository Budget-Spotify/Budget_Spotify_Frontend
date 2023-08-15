import './App.css';
import {Routes, Route, Navigate} from "react-router-dom"
import Home from './pages/Home';
import {LoginComponent} from "./pages/Login";
import {SignupComponent} from "./pages/Signup";
import Songspage from "./component/Songspage";
import React from "react";
import SongUploaded from "./component/SongsUploaded";
import UserList from './component/UserManager';
import SongCardDetail from "./component/SongCardDetail";
import EditPassword from './component/EditPassword';
import DetailUser from './component/DetailUser';
import SongInPlaylist from "./component/SongInPlaylist";
import UserPlaylist from './component/UserPlayList/UserPlayList';
import SongOnly from './component/SearchSongOnly';
import PlaylistOnly from './component/SearchPlaylistOnly';
import PlaylistDetail from './component/PlaylistDetail';



function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Home/>}>
                    <Route path="/" element={<Songspage/>}/>
                    <Route path="/search/songs" element={<SongOnly/>}/>
                    <Route path="/search/playlists" element={<PlaylistOnly/>}/>
                    <Route path="/playlists" element={<UserPlaylist/>}/>
                    <Route path="/playlist/detail/:playlistId" element={<PlaylistDetail/>}/>
                    <Route path="/playlists/song-in-play-list/:playlistId" element={<SongInPlaylist/>}/>
                    <Route path="/songs-uploaded" element={<SongUploaded/>}/>
                    <Route path="/users-manager" element={<UserList/>}/>
                    <Route path="/song/detail/:id" element={<SongCardDetail/>}/>
                    <Route path="/info/editpassword" element={<EditPassword/>}/>
                    <Route path="/info/detail" element={<DetailUser/>}/>
                </Route>
                <Route path="/login" element={<LoginComponent/>}/>
                <Route path="/signup" element={<SignupComponent/>}/>
                <Route path="*" element={<Navigate to="/login"/>}/>

            </Routes>
        </div>
    );
}

export default App;
