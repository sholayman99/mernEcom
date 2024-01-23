import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductByBrand from "./pages/ProductByBrand.jsx";
import ProductByCategory from "./pages/ProductByCategory.jsx";
import ProductByKeyword from "./pages/ProductByKeyword.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import RefundPage from "./pages/RefundPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import ComplainPage from "./pages/ComplainPage.jsx";
import HowToBuy from "./pages/HowToBuy.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OtpPage from "./pages/OtpPage.jsx";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={ <HomePage /> } />
                    <Route path={"/by-brand/:id"} element={ <ProductByBrand /> } />
                    <Route path={"/by-category/:id"} element={ <ProductByCategory /> } />
                    <Route path={"/by-keyword/:keyword"} element={ <ProductByKeyword /> } />
                    <Route path={"/details/:id"} element={ <ProductDetails /> } />
                    <Route path={"/contact"} element={ <ContactPage /> } />
                    <Route path={"/refund"} element={ <RefundPage /> } />
                    <Route path={"/privacy"} element={ <PrivacyPolicyPage /> } />
                    <Route path={"/terms"} element={ <TermsPage /> } />
                    <Route path={"/complain"} element={ <ComplainPage /> } />
                    <Route path={"/how-to-buy"} element={ <HowToBuy /> } />
                    <Route path={"/about"} element={ <AboutPage /> } />
                    <Route path={"/login"} element={ <LoginPage /> } />
                    <Route path={"/otp"} element={ <OtpPage /> } />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;