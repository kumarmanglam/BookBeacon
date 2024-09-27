import React from 'react'

import "./style.css"
import { Navigate, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className='navbar'>
            <div><button className='nav-logo' onClick={() => navigate("/licenses")}>BookBeacon</button></div>
        </div>
    )
}

export default Navbar