import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import RequireAuth from './utils/RequireAuth';
import Profile from './components/Profile';
import PersistLogin from './components/PersistLogin';



{/*naro routing disini ya gaes*/ }
function App() {
    return (
        <Routes>
            <Route path="/" element={< Layout />}>
                {/*public routes*/}
                <Route
                    path="auth/register"
                    element={<RegistrationForm />}
                />
                <Route
                    path="auth/login"
                    element={<LoginForm />}
                />
                {/*protected routes*/}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth />}>
                        <Route
                            path="profile"
                            element={<Profile />}
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
