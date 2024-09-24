import { Route, Routes } from 'react-router-dom';
import ViewBooksInsideLicense from "../pages/ViewBooksInsideLicense"
import ViewLicenses from "../pages/ViewLicenses";
import CreateLicense from '../pages/CreateLicense';

const RouterContainer = () => {
    return (
        <Routes>
            <Route path='/licenses' element={<ViewLicenses />} />
            <Route path='/booksInLicense' element={<ViewBooksInsideLicense />} />
            <Route path="/CreateLicense" element={<CreateLicense />} />
        </Routes>
    )
}

export default RouterContainer