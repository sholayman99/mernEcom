/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import AppNavbar from "./AppNavbar.jsx";
import Footer from "./Footer.jsx";
import {Toaster} from "react-hot-toast";

const Layout = ({children}) => {
    return (
        <>
          <AppNavbar />
            {children}
            <Toaster position={"bottom-center"} />
          <Footer />
        </>
    );
};

export default Layout;