import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';
import Home from './components/Home';
import Search from './components/Search';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import RequireAuth from './utils/RequireAuth';
import Profile from './components/Profile';
import TargetReminderForm from './components/TargetReminderForm';
import DetailTargetReminder from './components/DetailTargetReminder';
import DetailBuku from './components/DetailBuku';
import PersistLogin from './components/PersistLogin';




{/*naro routing disini ya gaes*/ }
function App() {
    return (
        <Routes>
            <Route path="/" element={< Layout />} >
                {/*public routes*/}
                <Route
                    path="/home" exact
                    element={<Home />}
                />
                <Route
                    path="auth/register"
                    element={<RegistrationForm />}
                />
                <Route
                    path="auth/login"
                    element={<LoginForm />}
                />
                {/* belum ditambahin auth guys */}
                <Route
                            path="targetreminderform/:id"
                            element={<TargetReminderForm />}
                        />
                <Route
                            path="detailtargetreminder/:id/:idbuku"
                            element={<DetailTargetReminder />}
                        />
                <Route
                            path="detailBuku/:id"
                            element={<DetailBuku />}
                        />
                </Route>
                {/* belum ditambahin auth guys */}
                <Route
                    path="books/search"
                    element={<Search />}
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
        </Routes>
    );
}

export default App;
