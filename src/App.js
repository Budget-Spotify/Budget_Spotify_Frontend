import './App.css';
import {Routes, Route, Navigate} from "react-router-dom"
import Home from './pages/Home';
import {LoginComponent} from "./pages/Login";
import {SignupComponent} from "./pages/Signup";
import Songspage from "./component/Songspage";
import React from "react";
import TableUnstyled from "./component/SongsUploaded";
import UserList from './component/UserManager';
import RecipeReviewCard from "./component/SongCardDetail";


function App() {
    return (
        <div className="App">

            <Routes>
                <Route path='/' element={<Home/>}>
                    <Route path="/" element={<Songspage/>}/>
                    <Route path="/songs-uploaded" element={<TableUnstyled/>}/>
                    <Route path="/users-manager" element={<UserList/>}/>
                    <Route path="/song/detail/:id" element={<RecipeReviewCard/>}/>
                </Route>
                <Route path="/login" element={<LoginComponent/>}/>
                <Route path="/signup" element={<SignupComponent/>}/>
                <Route path="*" element={<Navigate to="/login"/>}/>

            </Routes>
        </div>
    );
}

export default App;
