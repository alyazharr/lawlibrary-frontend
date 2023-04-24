import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
    return (
        <Routes>
            <Route path="/" element={< Layout />}>
                    <Route
                        path="auth/register"
                        element={<RegistrationForm />}
                    />
                    <Route
                        path="auth/login"
                        element={<LoginForm/>}
                    />

            </Route>
        </Routes>
    );
}

export default App;
