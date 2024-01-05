import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="outletDiv">
        <Outlet />
      </div>
      {pathname != "/home" && <Footer />}
    </>
  );
};

export default Layout;
