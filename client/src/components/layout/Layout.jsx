import React from 'react';
import AppNavbar from "./AppNavbar.jsx";
import Footer from "./Footer.jsx";

const Layout = ({children}) => {
    return (
        <>
          <AppNavbar />
            {children}
          <Footer />
        </>
    );
};

export default Layout;