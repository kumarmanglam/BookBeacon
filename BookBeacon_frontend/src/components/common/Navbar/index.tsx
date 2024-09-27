import React from 'react'

import "./style.css"
import { Navigate, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/login");
        sessionStorage.clear();
    }

    return (
        <div className='navbar'>
            <div><button className='nav-logo' onClick={() => navigate("/licenses")}>BookBeacon</button></div>
            <div><button className='nav-logo' onClick={handleLogout} id="logoutBtn">Logout</button></div>
        </div>
    )
}

export default Navbar