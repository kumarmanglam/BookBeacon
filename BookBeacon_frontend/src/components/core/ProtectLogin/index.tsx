import React from 'react'
import { useSelector } from 'react-redux'
import { selectLicenseState } from '../../../store/selectors/License.selector'
import { Navigate } from 'react-router-dom';

const ProtectLogin = () => {
    const licenseState = useSelector(selectLicenseState);
    const isUserLoggedIn = licenseState.isUserLoggedIn;
    return (<>{isUserLoggedIn ? <Navigate to="/licenses" /> : <Navigate to="/login" />}</>)
}

export default ProtectLogin
