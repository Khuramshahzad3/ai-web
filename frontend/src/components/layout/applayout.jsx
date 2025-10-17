import React from "react";
import Headers from "../Headers";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import ScrollToTop from "../Scrolltotop";

const Applayout = () => {
  return (
    <>
    <ScrollToTop />
    <div className="flex flex-col min-h-screen">
      <Headers />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  );
};

export default Applayout;
