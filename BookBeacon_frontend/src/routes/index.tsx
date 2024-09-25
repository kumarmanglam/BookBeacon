import { Route, Routes } from 'react-router-dom';
import ViewBooksInsideLicense from "../pages/ViewBooksInsideLicense"
import ViewLicenses from "../pages/ViewLicenses";
import CreateLicense from '../pages/CreateLicense';
import ConcurrencyPage from '../pages/Concurrency';

const RouterContainer = () => {
    return (
        <Routes>
            <Route path='/licenses' element={<ViewLicenses />} />
            <Route path='/booksInLicense' element={<ViewBooksInsideLicense />} />
            <Route path="/CreateLicense" element={<CreateLicense />} />
            <Route path="/editConcurracy" element={<ConcurrencyPage />} />
        </Routes>
    )
}

export default RouterContainer