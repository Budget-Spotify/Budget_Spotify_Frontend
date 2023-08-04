import {NavLink} from "react-router-dom";
import React from "react";

export default function SideBarMenu() {
    return (
        <>
            <NavLink to="/" className={({isActive}) =>
                isActive ? "navLinksClick" : "navLinks"
            }>
                Home
            </NavLink>
            <NavLink to="/playlists" className={({isActive}) =>
                isActive ? "navLinksClick" : "navLinks"
            }>
                Your Playlists
            </NavLink>
            <NavLink to="/songs-uploaded" className={({isActive}) =>
                isActive ? "navLinksClick" : "navLinks"
            }>
                Songs Uploaded
            </NavLink>
            <NavLink to="/users-manager" className={({isActive}) =>
                isActive ? "navLinksClick" : "navLinks"
            }>
                User Manager
            </NavLink>
        </>
    )
}