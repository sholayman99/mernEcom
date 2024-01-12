import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductByBrand from "./pages/ProductByBrand.jsx";
import ProductByCategory from "./pages/ProductByCategory.jsx";
import ProductByKeyword from "./pages/ProductByKeyword.jsx";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={ <HomePage /> } />
                    <Route path={"/by-brand/:id"} element={ <ProductByBrand /> } />
                    <Route path={"/by-category/:id"} element={ <ProductByCategory /> } />
                    <Route path={"/by-keyword/:keyword"} element={ <ProductByKeyword /> } />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;