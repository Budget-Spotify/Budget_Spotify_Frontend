import './App.css';
import {Routes, Route, Navigate} from "react-router-dom"
import Home from './pages/Home';
import LoginComponent from "./pages/Login";
import SignupComponent from "./pages/Signup";
import Songspage from "./component/Songspage";
import React from "react";
import TableUnstyled from "./component/SongsUploaded";


function App() {
    return (
        <div className="App">

            <Routes>
                <Route path='/' element={<Home/>}>
                    <Route path="/" element={<Songspage/>}/>
                    <Route path="/songs-uploaded" element={<TableUnstyled/>}/>
                </Route>
                <Route path="/login" element={<LoginComponent/>}/>
                <Route path="/signup" element={<SignupComponent/>}/>
                <Route path="*" element={<Navigate to="/login"/>}/>
                <Route path='/admin/userlist' element={<AdminPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
