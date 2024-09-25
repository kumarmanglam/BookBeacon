import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ViewBooksInsideLicense from "../pages/ViewBooksInsideLicense"
import ViewLicenses from "../pages/ViewLicenses";
import Login from "../pages/Login"
import Signup from "../pages/Signup"

const RouterContainer = () => {
    return (
        
        <Routes>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<ViewLicenses />} />
            <Route path='/booksInLicense' element={<ViewBooksInsideLicense />} />
        </Routes>
    )
}

export default RouterContainer