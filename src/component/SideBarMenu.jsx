import {NavLink} from "react-router-dom";
import * as React from 'react';
export default function SideBarMenu() {
    const userLoginJSON = localStorage.getItem('userLogin');
    const userLogin = JSON.parse(userLoginJSON);
    return (
        <>
            <NavLink to="/" className={({isActive}) =>
                isActive ? "navLinksClick" : "navLinks"
            }>
                Home
            </NavLink>
            <NavLink className={({isActive}) =>
                isActive ? "navLinksClick" : "navLinks"
            }>
                Account managers
            </NavLink>
            <NavLink to="/songs-uploaded" className={({isActive}) =>
                isActive ? "navLinksClick" : "navLinks"
            }>
                Songs Uploaded
            </NavLink>
            {userLogin && userLogin.role ==="admin"?(
                <NavLink to="/users-manager" className={({isActive}) =>
                isActive ? "navLinksClick" : "navLinks"
            }>
                User Manager
            </NavLink>
            ):(<></>)}
        </>
    )
}


