import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ViewBooksInsideLicense from "../pages/ViewBooksInsideLicense"
import ViewLicenses from "../pages/ViewLicenses";
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Layout from "../components/layout"
import ConcurrencyPage from "../pages/Concurrency/index";
import AuthenticatedComponent from "../components/core/AuthenticatedComponent";
import ProtectLogin from "../components/core/ProtectLogin";
import CreateLicense from '../pages/CreateLicense';

const RouterContainer = () => {
    return (
        <Routes>
            <Route path='/' element={<AuthenticatedComponent><ViewLicenses /></AuthenticatedComponent>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/licenses' element={<AuthenticatedComponent><ViewLicenses /></AuthenticatedComponent>} />
            <Route path='/booksInLicense' element={<AuthenticatedComponent><ViewBooksInsideLicense /></AuthenticatedComponent>} />
            <Route path='/license' element={<AuthenticatedComponent><ConcurrencyPage /></AuthenticatedComponent>} />
            <Route path='/createLicense' element={<AuthenticatedComponent><CreateLicense /></AuthenticatedComponent>} />
        </Routes>
    )
}

export default RouterContainer