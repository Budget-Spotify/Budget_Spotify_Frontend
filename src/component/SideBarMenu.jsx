import { NavLink } from "react-router-dom";
import React from "react";

export default function SideBarMenu() {
    const userLoginJSON = localStorage.getItem('userLogin');
    const userLogin = JSON.parse(userLoginJSON);
    return (
        <>
            <NavLink to="/" className={({ isActive }) =>
                isActive ? "navLinksClick" : "navLinks"
            }>
                Home
            </NavLink>
            {userLogin ? (
                <div>
                    <NavLink to="/playlists" className={({ isActive }) =>
                        isActive ? "navLinksClick" : "navLinks"
                    }>
                        Your Playlists
                    </NavLink>
                    <NavLink to="/songs-uploaded" className={({ isActive }) =>
                        isActive ? "navLinksClick" : "navLinks"
                    }>
                        Songs Uploaded
                    </NavLink>
                    {userLogin.role === "admin" ? (
                        <NavLink to="/users-manager" className={({ isActive }) =>
                            isActive ? "navLinksClick" : "navLinks"
                        }>
                            Admin Dash Board
                        </NavLink>
                    ):(<></>)}
                </div>
            ) : (<div></div>)}
        </>
    )
}