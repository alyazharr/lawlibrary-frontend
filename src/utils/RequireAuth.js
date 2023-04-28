
import { Outlet, Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/GlobalStates';


const RequireAuth = () => {
    const {authState} = useAuth()
    const location = useLocation();
    return (
        authState?.username
                ? <Outlet/>
                : <Navigate to="/auth/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;