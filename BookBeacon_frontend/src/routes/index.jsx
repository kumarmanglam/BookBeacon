import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ViewBooksInsideLicense from "../pages/ViewBooksInsideLicense"
import ViewLicenses from "../pages/ViewLicenses";
import ConcurrencyPage from "../pages/Concurrency/index";

const RouterContainer = () => {
    return (
        <Routes>
            <Route path='/' element={<ViewLicenses />} />
            <Route path='/licenses' element={<ViewLicenses />} />
            <Route path='/booksInLicense' element={<ViewBooksInsideLicense />} />
            <Route path='/license' element={<ConcurrencyPage />} />
        </Routes>
    )
}

export default RouterContainer