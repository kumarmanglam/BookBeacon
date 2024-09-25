import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ViewBooksInsideLicense from "../pages/ViewBooksInsideLicense"
import ViewLicenses from "../pages/ViewLicenses";
import Login from "../pages/Login"
import Signup from "../pages/Signup"

import ConcurrencyPage from "../pages/Concurrency/index";

import CreateLicense from '../pages/CreateLicense';


const RouterContainer = () => {
    return (
        
        <Routes>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<ViewLicenses />} />
            <Route path='/booksInLicense' element={<ViewBooksInsideLicense />} />
            <Route path='/license' element={<ConcurrencyPage />} />
            <Route path='/createLicense' element={<CreateLicense />} />
        </Routes>
    )
}

export default RouterContainer