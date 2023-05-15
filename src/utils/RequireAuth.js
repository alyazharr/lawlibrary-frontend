
import { Outlet, Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/GlobalStates';


const RequireAuth = ({allowedRoles}) => {
    const {authState} = useAuth()
    const location = useLocation();
    console.log(allowedRoles)
    return (
        authState?.username
        ? authState?.roles===allowedRoles 
                ? <Outlet/> 
                :<Navigate to="/unauthorized" state={{ from: location }} replace />
        :<Navigate to="/auth/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;