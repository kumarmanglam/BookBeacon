import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ViewBooksInsideLicense from "../pages/ViewBooksInsideLicense"
import ViewLicenses from "../pages/ViewLicenses";
import CreateLicense from '../pages/CreateLicense';

const RouterContainer = () => {
    return (
        <Routes>
            <Route path='/' element={<ViewLicenses />} />
            <Route path='/licenses' element={<ViewLicenses />} />
            <Route path='/booksInLicense' element={<ViewBooksInsideLicense />} />
            <Route path='/createLicense' element={<CreateLicense />} />
        </Routes>
    )
}

export default RouterContainer