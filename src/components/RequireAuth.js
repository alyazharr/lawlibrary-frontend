import AuthContext from '../context/GlobalStates';
import { Outlet, Navigate, useLocation } from 'react-router';
import React, {useContext } from 'react';

const RequireAuth = () => {
    const {authState} = useContext(AuthContext);
    const location = useLocation();

    return (
        authState?.username
                ? <Outlet/>
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;