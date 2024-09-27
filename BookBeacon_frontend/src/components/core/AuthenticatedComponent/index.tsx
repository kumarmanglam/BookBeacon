import React from 'react'
import { useSelector } from 'react-redux';
import { selectLicenseState } from '../../../store/selectors/License.selector';
import { Navigate } from 'react-router-dom';



interface AuthenticatedComponentProp {
    children: any;
}
const AuthenticatedComponent: React.FC<AuthenticatedComponentProp> = ({ children }) => {
    const licenseState = useSelector(selectLicenseState);
    const isAuthenticated = licenseState.isUserLoggedIn;

    if (isAuthenticated) {
        return children;
    }
    return (
        <Navigate to="/login" />
    )
}

export default AuthenticatedComponent