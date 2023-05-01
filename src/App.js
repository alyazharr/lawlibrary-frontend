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
import ProfileDetailPeminjaman from './components/ProfileDetailPeminjaman';
import ProfileDetailTargetReminder from './components/ProfileDetailTargetReminder';
import TargetReminderForm from './components/TargetReminderForm';
import DetailTargetReminder from './components/DetailTargetReminder';
import DetailPeminjaman from './components/DetailPeminjaman';
import DetailBuku from './components/DetailBuku';
import PinjamPage from './components/PinjamPage';
import PersistLogin from './components/PersistLogin';
import ReviewPage from './components/ReviewPage';
import ReviewDetail from './components/ReviewDetail';
import MyReview from './components/MyReview';
import Stock from "./components/Stock";

{/*naro routing disini ya gaes*/ }
function App() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
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
                        path="detailBuku/:id"
                        element={<DetailBuku />}
                    />
                    <Route
                        path="detailBuku/:id/stok"
                        element={<Stock />}
                    />
                    <Route
                        path="books/search"
                        element={<Search />}
                    />

                    {/*protected routes*/}

                    <Route element={<RequireAuth />}>
                        <Route
                            path="profile"
                            element={<Profile />}
                        />
                        <Route
                            path="reviews"
                            element={<ReviewPage />}
                        />
                        <Route
                            path="reviews/book/:id"
                            element={<ReviewDetail />}
                        />
                        <Route
                            path="reviews/update/:id"
                            element={<MyReview />}
                        />
                        <Route
                            path="reviews/delete/:id"
                            element={<MyReview />}
                        />
                        <Route
                            path="my-reviews/"
                            element={<MyReview />}
                        />
                        <Route
                            path="targetreminderform/:id"
                            element={<TargetReminderForm />}
                        />
                        <Route
                            path="detailtargetreminder/:id/:idbuku"
                            element={<DetailTargetReminder />}
                        />
                        <Route
                            path="detailpeminjaman/:id/:idbuku"
                            element={<DetailPeminjaman />}
                        />
                    <Route
                            path="profiledetailpeminjaman/:id/:idbuku"
                            element={<ProfileDetailPeminjaman />}
                        />
                    <Route
                            path="profiledetailtargetreminder/:id/:idbuku"
                            element={<ProfileDetailTargetReminder />}
                        />
                    <Route
                        path="pinjam/:id"
                        element={<PinjamPage />}
                    />
                    </Route>

                </Route>
            </Route>
        </Routes>
    );
}

export default App;
