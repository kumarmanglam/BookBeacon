import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ViewBooksInsideLicense from "../pages/ViewBooksInsideLicense"
import ViewLicenses from "../pages/ViewLicenses";

const RouterContainer = () => {
    return (
        <Routes>
            <Route path='/' element={<ViewLicenses />} />
            <Route path='/licenses' element={<ViewLicenses />} />
            <Route path='/booksInLicense' element={<ViewBooksInsideLicense />} />
        </Routes>
    )
}

export default RouterContainer