import React from 'react'
import { Route, Routes } from 'react-router-dom';
import ViewLicenses from "../pages/ViewLicenses"

const RouterContainer = () => {
    return (
        <Routes>
            <Route path='/licenses' element={<ViewLicenses />} />
        </Routes>
    )
}

export default RouterContainer